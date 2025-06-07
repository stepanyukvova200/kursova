export const ROUTERS = {
  ENTERPRISE_MANAGEMENT: '/admin/enterprise',
  ENTERPRISE_MANAGEMENT_NEW: '/admin/enterprise/new',
  ENTERPRISE_MANAGEMENT_DETAIL_ID: '/admin/enterprise/:id',
  ENTERPRISE_MANAGEMENT_EDIT_ID: '/admin/enterprise/:id/edit',
  ENTERPRISE_MANAGEMENT_DELETE_ID: '/admin/enterprise/:id/delete',

  HOLDING_MANAGEMENT: '/admin/holding',

  DEVELOPMENT: '/development',

  USER_MANAGEMENT: '/admin/user-management', // TODO: Check if its only for admin

  LOGS: '/admin/logs',
  DOCS: '/admin/docs',
  CONFIGURATION: '/admin/configuration',
  GRAFANA: '/admin/grafana',
  HEALTH: '/admin/health',
  METRICS: '/admin/metrics',

  ENTITIES_INSPECTOR: '/admin/entities-inspector',

  ENDPOINT_GROUP: '/admin/endpoint-group',

  ENDPOINT_ACCESS: '/admin/endpoint-access',

  COMPONENT_ACCESS: '/admin/component-access',
  COMPONENT_ACCESS_NEW: '/admin/component-access/new',
  COMPONENT_ACCESS_DETAIL_ID: '/admin/component-access/:id',
  COMPONENT_ACCESS_EDIT_ID: '/admin/component-access/:id/edit',
  COMPONENT_ACCESS_DELETE_ID: '/admin/component-access/:id/delete',

  PERMISSION: '/admin/permission', // TODO: Check if its only for admin
  PERMISSION_NEW: '/admin/permission/new',
  PERMISSION_DETAIL_ID: '/admin/permission/:id',
  PERMISSION_EDIT_ID: '/admin/permission/:id/edit',
  PERMISSION_DELETE_ID: '/admin/permission/:id/delete',

  ADMIN_SETTINGS_SILO_MANAGER: '/settings/silo-management',
  ADMIN_SETTINGS_USER_MANAGER: '/settings/user-management',
  ADMIN_SETTINGS_H2: '/settings/h2',
  ADMIN_SETTINGS_DATA_SOURCES: '/settings/data-sources',
  ADMIN_SETTINGS_DATA_IMPORT: '/settings/data-import',
  ADMIN_SETTINGS_DATA_EXPORT: '/settings/data-export',
  ADMIN_SETTINGS_SCHEDULER: '/settings/scheduler',

  // USER
  HOLDING_ENTERPRISES: '/menu/holding-enterprises',
  ELEVATOR: '/menu/elevator',
  ENERGY_EFFICIENCY: '/menu/energy-efficiency',
  TECH_REVIEW: '/menu/tech-review',
  EQUIPMENT_ADMINISTRATION: '/menu/equipment-administration',

  THERMOMETRY: '/menu/thermometry',
  THERMOMETRY_TEMPERATURE: '/menu/thermometry/temperature-monitoring',
  THERMOMETRY_REPORTS: '/menu/thermometry/reports',
  THERMOMETRY_REPORTS_VIEW: '/menu/thermometry/report-view',
  THERMOMETRY_TEMPERATURE_MAP: '/menu/thermometry/temperature-monitoring/map',
  THERMOMETRY_TEMPERATURE_SILOSCARD: '/menu/thermometry/temperature-monitoring/siloscard',
  THERMOMETRY_TEMPERATURE_HULLCARD: '/menu/thermometry/temperature-monitoring/hullcard',
};
