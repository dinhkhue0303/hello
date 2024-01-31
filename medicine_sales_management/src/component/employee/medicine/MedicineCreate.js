import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

export function MedicineCreate(){
    const navigate = useNavigate();
    const [employee,setEmployee] = useState();
    const [medicine,setMedicine] = useState({
        name: "",
        unit: "",
        price: "",
        quantity: "",
        productionDate: "",
        expirationDate: "",
        employee:{
            id_employee: 0,
            name: "",
            gender: 0,
            phoneNumber: "",
            address: "",
            userName: "",
            password: "",
            salary: "",
            dayOfWork: "",
            role: 0
        }
    });
    useEffect(() => {
        findAllEmployee();
    }, []);
    const validateSchema = {
        name: Yup.string().required(),
        price: Yup.number().required().min(0),
        quantity: Yup.number().required().min(0),
        productionDate: Yup.string().required(),
        expirationDate: Yup.string().required()
    }
    const findAllEmployee = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/employee/list");
            setEmployee(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        try {
            await axios.post("http://localhost:8080/api/medicine/create", values);
            navigate("/medicine/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }

    if(!employee) return null;

    return (
        <>
            <h1>create medicine</h1>
            <Formik initialValues={{...medicine, employee: JSON.stringify(employee[0])}} onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                const obj = {
                    ...values, unit: "viên" , employee: JSON.parse(values.employee)
                }
                handleCreate(obj);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">name</label>
                                <Field type="text" className="form-control" name="name"/>
                                <ErrorMessage name="name" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">unit</label>
                                <Field disabled type="text" className="form-control" name="unit" value="viên"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">price</label>
                                <Field type="number" className="form-control" name="price"/>
                                <ErrorMessage name="price" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">quantity</label>
                                <Field type="number" className="form-control" name="quantity"/>
                                <ErrorMessage name="quantity" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">production date</label>
                                <Field type="datetime-local" className="form-control" name="productionDate"/>
                                <ErrorMessage name="productionDate" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">expiration date</label>
                                <Field type="datetime-local" className="form-control" name="expirationDate"/>
                                <ErrorMessage name="expirationDate" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">employee</label>
                                <Field as="select" className="form-select" name="employee">
                                    {employee?.map((item) => (
                                        <option key={item.id_employee} value={JSON.stringify(item)}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            {
                                isSubmitting ? <></> : <button type="submit" className="btn btn-primary">create</button>
                            }
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}