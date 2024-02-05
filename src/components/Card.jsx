import { useSelector } from "react-redux";

export default function KanbanCard({ id, title, tag, user, priorityIcon }) {
  const group = useSelector((state) => state.filtering.group);
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="avatar-container">
          <div className="user-avatar" style={{ backgroundColor: user.color }}>
            {initials}
          </div>
          <div
            className="status-indicator"
            style={{ backgroundColor: user.available ? "#00FF00" : "red" }}
          ></div>
        </div>
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-footer">
        {group != "priority" && (
          <div className="footer-icon">{priorityIcon}</div>
        )}

        {tag.map((tag_content) => (
          <div className="tag" key={tag_content}>
            <div className="tag-indicator"></div>
            <div className="tag-content">{tag_content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
