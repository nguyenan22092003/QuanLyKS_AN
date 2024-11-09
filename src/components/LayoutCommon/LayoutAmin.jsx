import "./styles.scss";

const LayoutAdmin = ({ children, className, styles }) => {
  return (
    <div className={`layout-admin ${className}`} style={{ ...styles }}>
      {children}
    </div>
  );
};

export default LayoutAdmin;
