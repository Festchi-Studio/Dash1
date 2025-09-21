export const Roles = {
  PRODUCT_OWNER: "Product Owner",
  TEAM_LEAD: "Team Lead",
  PROJECT_MANAGER: "Project Manager",
  ENGINEERING_MANAGER: "Engineering Manager"
};

export const users = [
  { username: "po", password: "po123", role: Roles.PRODUCT_OWNER },
  { username: "tl", password: "tl123", role: Roles.TEAM_LEAD },
  { username: "pm", password: "pm123", role: Roles.PROJECT_MANAGER },
  { username: "em", password: "em123", role: Roles.ENGINEERING_MANAGER }
];