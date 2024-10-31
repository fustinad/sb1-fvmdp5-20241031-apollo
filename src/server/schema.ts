export const typeDefs = `#graphql
  type Query {
    metrics: Metrics!
    tableData(catalog: String!, schema: String!, table: String!): [TableRow!]!
    dashboardData: DashboardData!
  }

  type Metrics {
    totalUsers: Int!
    activeUsers: Int!
    conversionRate: Float!
    revenue: Float!
  }

  type TableRow {
    id: ID!
    values: [String!]!
    metadata: TableMetadata!
  }

  type TableMetadata {
    columns: [Column!]!
    lastUpdated: String!
  }

  type Column {
    name: String!
    type: String!
  }

  type DashboardData {
    activityByRegion: [RegionActivity!]!
    growthTrends: [GrowthTrend!]!
    performanceMetrics: PerformanceMetrics!
  }

  type RegionActivity {
    region: String!
    value: Float!
  }

  type GrowthTrend {
    month: String!
    value: Float!
  }

  type PerformanceMetrics {
    conversion: MetricValue!
    engagement: MetricValue!
    bounceRate: MetricValue!
  }

  type MetricValue {
    value: Float!
    change: Float!
    trend: String!
  }
`;