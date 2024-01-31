import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import Moment from "moment/moment";

export function MemberList(){
    const [searchName,setSearchName] = useState("");
    const [idDelete,setIdDelete] = useState(0);
    const [nameDelete,setNameDelete] = useState("");
    const [member,setMember] = useState();
    useEffect(() => {
        findAll(searchName);
    }, [searchName]);
    const findAll = async (searchName) => {
        try {
            let temp = await axios.get(
                "http://localhost:8080/api/member/listSearchName?name=" + searchName);
            setMember(temp.data);
        }catch (e){
            console.log(e);
        }
    }
    const handleIdNameDelete = (item) => {
        setIdDelete(item.id_member);
        setNameDelete(item.name);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8080/api/member/" + id);
            toast("xóa thành công",{
                position: "top-center",
                autoClose: 2000
            })
            findAll(searchName);
        }catch (e) {
            console.log(e);
        }
    }
    return(
        <>
            <h1>Danh sách hội viên</h1>
            <div>
                <NavLink id="btn_create_member" to={"/member/create"} className="btn btn-primary">create</NavLink>
                <input id="input_search_name_member" name="searchName" className="form-control" placeholder="search name"
                       style={{width: "150px"}} onChange={(evt) => setSearchName(evt.target.value)}/>
            </div>
            <div>
                {member && member?.length > 0 ? (
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>phone number</th>
                            <th>type member</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {member?.map((item,index) => (
                            <tr key={item.id_member}>
                                <td>{item.id_member}</td>
                                <td>{item.name}</td>
                                <td>{item.numberPhone}</td>
                                <td>{item.typeMember.type_member_name}</td>
                                <td>
                                    <NavLink to={`/member/update/${item.id_member}`} className="btn btn-primary">update</NavLink>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleIdNameDelete(item)}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (<p style={{ textAlign: "center", marginTop: "20px",fontSize: '1.5em' }}><b>no result found</b></p>)}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                bạn có muốn xóa name là <span style={{color: "red"}}>{nameDelete}</span>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={() => handleDelete(idDelete)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}