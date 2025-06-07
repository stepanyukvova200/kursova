export const PERMISSIONS = {
  SETTINGS: 'settings',
  READ_HOLDING: 'read_holding', // MAIN BLOCK Holding
  READ_ENTERPRISES: 'read_enterprises', // Page

  READ_ELEVATOR: 'read_elevator', // MAIN BLOCK Elevator
  READ_OPERATIONAL_DASHBOARD: 'read_operational_dashboard', // Page Dashboard
  UPDATE_OPERATIONAL_DASHBOARD: 'update_operational_dashboard',

  READ_ANNUAL_PROCUREMENT_PLAN: 'read_annual_procurement_plan',
  READ_SILAGE_BOARD: 'read_silage_board',
  READ_ENERGY_INDICATORS: 'read_energy_indicators',
  READ_RECEIPTS: 'read_receipts',
  READ_DAILY_PLAN: 'read_daily_plan',
  READ_EXPENSE: 'read_expense',

  READ_ENERGY_EFFICIENCY: 'read_energy_efficiency', // Page Energy Efficiency
  READ_TECH_PROCESS: 'read_tech_process',
  READ_ELEVATOR_EQUIPMENT: 'read_elevator_equipment',
  READ_HOLDING_ENERGY: 'read_holding_energy',
  READ_ROUTE_COMMITS: 'read_route_commits',

  READ_MAINTENANCE_SERVICE: 'read_maintenance_service', // MAIN BLOCK Maintenance and Repair
  READ_TECH_REVIEW: 'read_tech_review', // Page Tech review
  READ_EQUIPMENT_ADMINISTRATION: 'read_equipment_administration', // Page Equip admin

  READ_THERMOMETRY: 'read_thermometry', // MAIN BLOCK Thermometry
  READ_THERMOMETRY_TEMPERATURE: 'read_thermometry_temperature', // Page Thermometry Temperature
  READ_THERMOMETRY_REPORTS: 'read_thermometry_reports', // Page Thermometry Report
};

// TODO: delete, when API will done
export const userPermissions = [
  'settings',
  'read_holding',
  'read_enterprises',

  'read_elevator',
  'read_operational_dashboard',
  'update_operational_dashboard',

  'read_annual_procurement_plan',
  'read_silage_board',
  'read_energy_indicators',
  'read_receipts',
  'read_daily_plan',
  'read_expense',

  'read_energy_efficiency',
  'read_tech_process',
  'read_elevator_equipment',
  'read_holding_energy',
  'read_route_commits',

  'read_maintenance_service',
  'read_tech_review',
  'read_equipment_administration',

  'read_thermometry',
  'read_thermometry_temperature',
  'read_thermometry_reports',
];
