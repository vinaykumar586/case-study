import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminManage/AdminHeader";
import "./Admin.scss";
const Admin = (props) => {
  const data = useLocation();
  console.log(data);
  return (
    <div>
      <AdminHeader />
    </div>
  );
};
export default Admin;
