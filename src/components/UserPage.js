import { getCurrentUser } from "../auth/auth";

export default function UserPage() {
  const user = getCurrentUser();
  if (!user) {
    return <div>Access Denied</div>;
  }

  return (
    <div style={{margin: "2rem", textAlign: "center"}}>
      <h3>User Page</h3>
      <p>You are logged in as <b>{user.username}</b> with role <b>{user.role}</b>.</p>
      {user.role === "Product Owner" && <div>Product Owner content: Product vision, requirements, and priorities.</div>}
      {user.role === "Team Lead" && <div>Team Lead content: Sprint planning, task assignment, and progress tracking.</div>}
      {user.role === "Project Manager" && <div>Project Manager content: Schedule, resource, and risk management.</div>}
      {user.role === "Engineering Manager" && <div>Engineering Manager content: Team growth, performance, and technical direction.</div>}
    </div>
  );
}