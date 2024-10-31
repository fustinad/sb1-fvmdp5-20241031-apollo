import { gql } from '@apollo/client';

export const GET_METRICS = gql`
  query GetMetrics {
    metrics {
      totalUsers
      activeUsers
      conversionRate
      revenue
    }
  }
`;

export const GET_TABLE_DATA = gql`
  query GetTableData($catalog: String!, $schema: String!, $table: String!) {
    tableData(catalog: $catalog, schema: $schema, table: $table) {
      id
      values
      metadata {
        columns {
          name
          type
        }
        lastUpdated
      }
    }
  }
`;

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    dashboardData {
      activityByRegion {
        region
        value
      }
      growthTrends {
        month
        value
      }
      performanceMetrics {
        conversion {
          value
          change
          trend
        }
        engagement {
          value
          change
          trend
        }
        bounceRate {
          value
          change
          trend
        }
      }
    }
  }
`;