import "./styles.scss";

const LayoutUser = ({ children, className, styles }) => {
  return (
    <div className={`layout-user ${className}`} style={{ ...styles }}>
      {children}
    </div>
  );
};

export default LayoutUser;
