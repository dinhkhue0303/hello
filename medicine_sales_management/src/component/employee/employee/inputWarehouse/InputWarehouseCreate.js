import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Select from "react-select";

export function InputWarehouseCreate(){

    const [searchNameMedicine,setSearchNameMedicine] = useState("");
    const [searchNameSupplier,setSearchNameSupplier] = useState("");
    const [medicine,setMedicine] = useState();
    const [supplier,setSupplier] = useState();
    const [total, setTotal] = useState();
    const navigate = useNavigate();
    const [inputWarehouse,setInputWarehouse] = useState({
        inputDay: "",
        unit: "viên",
        price: "",
        quantity: "",
        totalPayment: "",
        supplier: {
            id_supplier: 0,
            name: "",
            taxCode: "",
            address: "",
            phoneNumber: "",
            email: "",
            status: ""
        },
        medicine: {
            id_medicine: 0,
            name: "",
            unit: "",
            price: "",
            quantity: "",
            productionDate: "",
            expirationDate: "",
            employee: {
                id_employee: 0,
                name: "",
                gender: "",
                phoneNumber: "",
                address: "",
                userName: "",
                password: "",
                salary: "",
                dayOfWork: "",
                role: ""
            }
        }
    });
    useEffect(() => {
        findAllMedicine();
        findAllSupplier();
    }, []);
    const validateSchema = {
        inputDay: Yup.string().required(),
        price: Yup.string().required(),
        quantity: Yup.string().required(),
    }
    const findAllMedicine = async () => {
        try{
            let temp = await axios.get("http://localhost:8080/api/medicine/list");
            setMedicine(temp.data);
            console.log(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const findAllSupplier = async () => {
        try {
            let temp = await axios.get("http://localhost:8080/api/supplier/list");
            setSupplier(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleCreate = async (values) => {
        console.log(values);
        try {
            await axios.post("http://localhost:8080/api/inputWarehouse/create", values);
            navigate("/inputWarehouse/list");
            toast("thêm mới thành công",{
                position: "top-center",
                autoClose: 2000
            })
        }catch (e){
            console.log(e);
        }
    }



    if(!supplier || !medicine) return null;

    return (
        <>
            <h1>tạo mới hóa đơn nhập kho</h1>
            <Formik initialValues={{...inputWarehouse, medicine: JSON.stringify(medicine[0]), supplier: JSON.stringify(supplier[0])}}
                    onSubmit={(values,{setSubmitting}) => {
                setSubmitting(false);
                const obj = {
                    ...values,totalPayment: values.price * values.quantity, medicine: JSON.parse(values.medicine),
                    supplier: JSON.parse(values.supplier)
                }

                console.log(obj);
                handleCreate(obj);
            }} validationSchema={Yup.object(validateSchema)}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label">ngày nhập</label>
                                <Field type="datetime-local" className="form-control" name="inputDay"/>
                                <ErrorMessage name="inputDay" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">đơn vị</label>
                                <Field disabled type="text" className="form-control" name="unit"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">giá</label>
                                <Field type="number" className="form-control" name="price"/>
                                <ErrorMessage name="price" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">số lượng</label>
                                <Field type="number" className="form-control" name="quantity"/>
                                <ErrorMessage name="quantity" component="span" style={{color: "red"}}></ErrorMessage>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">tổng tiền</label>
                                <Field disabled type="text" className="form-control" name="totalPayment"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">medicine</label>
                                <Select name="medicine" options={medicine} getOptionLabel={(option) => `${option.name}`}
                                        getOptionValue={(option) => `${option.id_medicine}`}/>

                                {/*<Field as="select" className="form-select" name="medicine">*/}
                                {/*    {medicine?.map((item) => (*/}
                                {/*        <option key={item.id_medicine} value={JSON.stringify(item)}>*/}
                                {/*            {item.name}*/}
                                {/*        </option>*/}
                                {/*    ))}*/}
                                {/*</Field>*/}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">supplier</label>
                                <Field as="select" className="form-select" name="supplier">
                                    {supplier?.map((item) => (
                                        <option key={item.id_supplier} value={JSON.stringify(item)}>
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