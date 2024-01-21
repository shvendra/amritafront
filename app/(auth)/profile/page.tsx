"use client"
import { useState, useEffect } from "react";
const API_METHOD = 'POST'
const STATUS_IDLE = 0
const STATUS_UPLOADING = 1
import { exit } from 'process';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { apiConstants } from "../../apiConstrants";



  export default function Profile() {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [branch, setBranch] = useState('');
    const [sem, setSem] = useState('');
    const [data, setData] = useState([]);
    const [role, setRole] = useState();
    const [filters, setFilters] = useState<DataTableFilterMeta>({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      dname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      uploadedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      uploadedByName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      branch: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      semester: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    // const [role, setRole] = useState(localStorage.getItem('role'));
    const [status, setStatus] = useState(STATUS_IDLE)
    const [uploadedname, setUploadedName] = useState(localStorage.getItem('name'))

    if(localStorage.getItem('token') == null) {
      router.push('/signin')
    }

    // console.log(localStorage.getItem('uemail'));

    useEffect(() => {
      let text = localStorage.getItem('uemail');
    var position = text.search("student");
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      if(position === -1) {
       setRole('Teacher')
      fetch(apiConstants.GET_DOC, requestOptions)
      .then(response => response.text())
      .then(result => setData(JSON.parse(result))
      ).catch(error => console.log('error', error));
      } else {
        setRole('Student')
        fetch(apiConstants.GET_DOC_STUDENTS, requestOptions)
        .then(response => response.text())
        .then(result => setData(JSON.parse(result))
        ).catch(error => console.log('error', error));
      }
    });
   
    const uploadFiles = (data:any)=> {
      if(branch == '') {
        toast.error('Branch selection required', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          return;
      }
      if(sem == '') {
        toast.error('Semester selection required', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          return;
      }
      setStatus(STATUS_UPLOADING);
console.log(data);
      fetch(apiConstants.UPLOAD_DOC, {
          method: API_METHOD,
          body: data,
      })
      .then((res) => res.json())
      .then((data) => 
      
      {
        toast.success('Documents Uploaded', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      })
      .catch((err) => console.error(err))
      .finally(() => setStatus(STATUS_IDLE))
  }
  const [isActive, setActive] = useState('unactive');

 
const changefilestatus = async(status:any, value2:any) => {
  console.log(status)
  // var button = document.getElementById(value2);
  // if(status == 'publish') {
  //   button.style.backgroundColor = 'red';
  // } else {
  //   button.style.backgroundColor = 'green';
  // }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "docstatus": status,
    "_id": value2
    });
  fetch(apiConstants.DOCUMENT_STATUS, {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
    .then(response => response.text())
    .then(result => 
      {
        if(JSON.parse(result).message === 'Document pending Successfully!') 
        {
          toast.error(JSON.parse(result).message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        } else {
          toast.success('Document publish Successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        }
      }
     
      )
    .catch(error => console.log('error', error));






  
}
  const handleUploadClick = (event:any) => {
    event.preventDefault();
      if (files.length) {

        const formdata = new FormData();
        [...files].forEach((file:any, i) => {
          formdata.append(`files`, file, file.name)
      })          
      formdata.append(`branch`, branch);
      formdata.append("uploadedBy", role);
      formdata.append("uploadedByName", uploadedname);
      formdata.append("docstatus", "publish");
      formdata.append("semester", sem);
      console.log(formdata);
          uploadFiles(formdata)
      } else {
        toast.error('Select files', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          exit;
      }
  }

  // const renderFileList = () => (<ol>
  //     {[...files].map((f, i) => (
  //         <li key={i}>{f.name} - {f.type}</li>
  //     ))}
  // </ol>)

  // const renderButtonStatus = () => (
  //     (status === STATUS_IDLE) ? 
  //         'Send to server' : 
  //         <img src = {load} />
  // )
    return (
      <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <ToastContainer />

            {/* Page header */}
            <div className=" mx-auto pb-12 md:pb-20">
              <h1 className="h1">Hi, {localStorage.getItem('name')}</h1>
            </div>
  
            <div className="max-w-sm mx-auto floatright">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    
                  </div>
                </div>
                <div className="text-gray-400">Upload documents</div>
                <form onSubmit={handleUploadClick}>
              <div className="flex items-center my-6">
                
              <div className=" px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Branch</label>
                    <select onChange={e => setBranch(e.target.value)} className="form-input  text-gray-300" name="branch" id="branch">
                    <option value="">Select</option>
                    <option value="CSE-CT">CSE-CT</option>
                    <option value="CSE-CYS
">CSE-CYS
</option>
                    <option value="CSE-AI
">CSE-AI
</option>
<option value="EEE">EEE</option>

                    <option value="ECE">ECE</option>
                    <option value="CCE">CCE</option>
                    <option value="MECH">MECH</option>
                    <option value="ECE">ARE</option>
                 

                  </select>
                  </div> 
                  <div className=" px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Semester</label>
                    <select onChange={e => setSem(e.target.value)} className="form-input  text-gray-300" name="semester" id="sem">
                    <option value="">Select</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="VI">VI</option>
                    <option value="VII">VII</option>
                    <option value="VIII">VIII</option>

                  </select>                 
                  </div>
                  <div className=" px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">‎ </label>
                    <input type="file"
            multiple
            onChange={(e)=> setFiles(e.target.files)} className="form-input  text-gray-300"  id="myfile" name="files"/>
                  </div>
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">‎ </label>
                    <button  disabled={status === STATUS_UPLOADING} className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Upload</button>
                  </div>
                <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                
                <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
              </div>
              </form>

              {/* {renderFileList()} */}
              <div>
              <div className="card">
              <DataTable value={data}  removableSort  paginator rows={10} dataKey="_id" filters={filters} globalFilterFields={['dname', 'docstatus', 'semester', 'branch', 'uploadedBy']}  tableStyle={{ minWidth: '50rem' }} filterDisplay="row" emptyMessage="No data found.">
    <Column  field="dname" header="Document" 
    body={(rowData) => {
      return (
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#3F00FF",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: "#23297A",
              },
            }}
            
          >
            
            <a className="dname" href={apiConstants.BASE_URL+'/public/'+rowData.dname} target="_blank" 
        rel="noreferrer" download="Example-PDF-document"
>{rowData.dname.replace('public/','')}</a>

          </div>
        </div>
      );
    }}
    
    filter filterPlaceholder="Search by document" style={{ minWidth: '10rem' }}></Column>
    <Column field="branch" header="Branch" style={{ minWidth: '6rem' }}  filter filterPlaceholder="Branch"></Column>
    <Column field="semester" header="Sem" filter filterPlaceholder="Semester" style={{ minWidth: '4rem' }}></Column>
    <Column field="uploadedByName" header="Upload By Name" filter filterPlaceholder="Uploaded by" style={{ minWidth: '9rem' }}></Column>

    <Column field="uploadedBy" header="Upload By" filter filterPlaceholder="Uploaded by" style={{ minWidth: '9rem' }}></Column>
    <Column field="createdAt" header="Date/Time" style={{ minWidth: '16rem' }}></Column>
   
    <Column  field="dname" header="Action" style={{ minWidth: '5rem' }}
    body={(rowData) => {
      return (
        <div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {role === 'Student' ? (
          <div
            style={{
              color: "#3F00FF",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: "#23297A",
              },
            }}>
            <div>{rowData.docstatus}</div>
          </div>
          ): (<div><div className="container aligncenter">
          <button onClick={()=>changefilestatus(rowData.docstatus, rowData._id)} className={'btnp '+ isActive} id={rowData._id}>
          <span  className={'circle ' + rowData.docstatus + " " + isActive + '' + rowData._id}></span>
          <span className={'line ' + rowData.docstatus  + " " + + isActive + '' + rowData._id}></span>
          </button>
        </div></div>)}
        </div>
      );
    }}></Column>
    
</DataTable>
              </div>

              </div>
              <div className="text-gray-400 text-center mt-6">

              </div>
            </div>
  
          </div>
        </div>
      </section>
    )
  }
  