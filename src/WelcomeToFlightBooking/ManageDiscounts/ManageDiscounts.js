import React from "react";
import AdminHeader from "./../AdminManage/AdminHeader";
const ManageDiscount = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <h4>Coupons</h4>
        <p>ABC453</p>
        <p>XBC453</p>
        <p>XSC453</p>
        <p>ABW453</p>
        <p>WBB453</p>
      </div>
      <div>
        <button>Add New Coupon</button>
        <button>Remove Coupon</button>
      </div>
    </div>
  );
};
export default ManageDiscount;
