import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "./component/components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MedicineList} from "./component/employee/medicine/MedicineList";
import {ToastContainer} from "react-toastify";
import {MedicineCreate} from "./component/employee/medicine/MedicineCreate";
import {MedicineUpdate} from "./component/employee/medicine/MedicineUpdate";
import {MemberList} from "./component/employee/member/MemberList";
import {MemberCreate} from "./component/employee/member/MemberCreate";
import {MemberUpdate} from "./component/employee/member/MemberUpdate";
import {EmployeeList} from "./component/employee/admin/employee/EmployeeList";
import {EmployeeCreate} from "./component/employee/admin/employee/EmployeeCreate";
import {EmployeeUpdate} from "./component/employee/admin/employee/EmployeeUpdate";
import {SupplierList} from "./component/employee/admin/supplier/SupplierList";
import {SupplierCreate} from "./component/employee/admin/supplier/SupplierCreate";
import {SupplierUpdate} from "./component/employee/admin/supplier/SupplierUpdate";
import {InputWarehouseList} from "./component/employee/employee/inputWarehouse/InputWarehouseList";
import {InputWarehouseCreate} from "./component/employee/employee/inputWarehouse/InputWarehouseCreate";
import {InputWarehouseUpdate} from "./component/employee/employee/inputWarehouse/InputWarehouseUpdate";

function App() {
  return (
      <>
        <Navbar></Navbar>
          <BrowserRouter>
              <Routes>
                  <Route path={"/medicine/list"} element={<MedicineList/>}></Route>
                  <Route path={"/medicine/create"} element={<MedicineCreate/>}></Route>
                  <Route path={"/medicine/update/:id"} element={<MedicineUpdate/>}></Route>

                  <Route path={"/member/list"} element={<MemberList/>}></Route>
                  <Route path={"/member/create"} element={<MemberCreate/>}></Route>
                  <Route path={"/member/update/:id"} element={<MemberUpdate/>}></Route>

                  <Route path={"/employee/list"} element={<EmployeeList/>}></Route>
                  <Route path={"/employee/create"} element={<EmployeeCreate/>}></Route>
                  <Route path={"/employee/update/:id"} element={<EmployeeUpdate/>}></Route>

                  <Route path={"/supplier/list"} element={<SupplierList/>}></Route>
                  <Route path={"/supplier/create"} element={<SupplierCreate/>}></Route>
                  <Route path={"/supplier/update/:id"} element={<SupplierUpdate/>}></Route>

                  <Route path={"/inputWarehouse/list"} element={<InputWarehouseList/>}></Route>
                  <Route path={"/inputWarehouse/create"} element={<InputWarehouseCreate/>}></Route>
                  <Route path={"/inputWarehouse/update"} element={<InputWarehouseUpdate/>}></Route>
              </Routes>
              <ToastContainer/>
          </BrowserRouter>
      </>
  );
}

export default App;
