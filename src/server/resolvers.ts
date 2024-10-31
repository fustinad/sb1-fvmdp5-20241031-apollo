import type { DatabricksService } from './services/databricks';

interface Context {
  dataSources: {
    databricks: DatabricksService;
  };
}

export const resolvers = {
  Query: {
    metrics: async (_: any, __: any, { dataSources }: Context) => {
      const result = await dataSources.databricks.query(`
        SELECT 
          COUNT(DISTINCT user_id) as total_users,
          COUNT(DISTINCT CASE WHEN last_active > CURRENT_DATE - INTERVAL 30 DAYS THEN user_id END) as active_users,
          AVG(conversion_rate) as conversion_rate,
          SUM(revenue) as total_revenue
        FROM metrics.user_activity
      `);

      return {
        totalUsers: result[0].total_users,
        activeUsers: result[0].active_users,
        conversionRate: result[0].conversion_rate,
        revenue: result[0].total_revenue,
      };
    },

    tableData: async (_: any, { catalog, schema, table }: { catalog: string; schema: string; table: string }, { dataSources }: Context) => {
      const result = await dataSources.databricks.query(`
        SELECT *
        FROM ${catalog}.${schema}.${table}
        LIMIT 1000
      `);

      return result.map((row: any, index: number) => ({
        id: index.toString(),
        values: Object.values(row),
        metadata: {
          columns: Object.keys(row).map(key => ({
            name: key,
            type: typeof row[key],
          })),
          lastUpdated: new Date().toISOString(),
        },
      }));
    },

    dashboardData: async (_: any, __: any, { dataSources }: Context) => {
      const [activityResult, growthResult, performanceResult] = await Promise.all([
        dataSources.databricks.query(`
          SELECT region, AVG(activity_score) as value
          FROM metrics.regional_activity
          GROUP BY region
          ORDER BY value DESC
        `),
        dataSources.databricks.query(`
          SELECT 
            DATE_FORMAT(date, 'MMM') as month,
            growth_rate as value
          FROM metrics.monthly_growth
          ORDER BY date DESC
          LIMIT 6
        `),
        dataSources.databricks.query(`
          SELECT 
            conversion_rate,
            engagement_rate,
            bounce_rate,
            prev_conversion_rate,
            prev_engagement_rate,
            prev_bounce_rate
          FROM metrics.performance_summary
          ORDER BY date DESC
          LIMIT 1
        `),
      ]);

      return {
        activityByRegion: activityResult.map((row: any) => ({
          region: row.region,
          value: row.value,
        })),
        growthTrends: growthResult.map((row: any) => ({
          month: row.month,
          value: row.value,
        })),
        performanceMetrics: {
          conversion: {
            value: performanceResult[0].conversion_rate,
            change: performanceResult[0].conversion_rate - performanceResult[0].prev_conversion_rate,
            trend: performanceResult[0].conversion_rate > performanceResult[0].prev_conversion_rate ? 'up' : 'down',
          },
          engagement: {
            value: performanceResult[0].engagement_rate,
            change: performanceResult[0].engagement_rate - performanceResult[0].prev_engagement_rate,
            trend: performanceResult[0].engagement_rate > performanceResult[0].prev_engagement_rate ? 'up' : 'down',
          },
          bounceRate: {
            value: performanceResult[0].bounce_rate,
            change: performanceResult[0].bounce_rate - performanceResult[0].prev_bounce_rate,
            trend: performanceResult[0].bounce_rate < performanceResult[0].prev_bounce_rate ? 'up' : 'down',
          },
        },
      };
    },
  },
};