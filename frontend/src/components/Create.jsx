import {React, useEffect, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField';
import MyTextField from './forms/MyTextField';
import MySelectField from './forms/MySelectField';
import MyMultiLineField from './forms/MyMultiLineField';
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios';
import Dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';
import { yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyMultiSelectField from './forms/mYMultiSelectField';

const Create = () => {

  const [projectManager, setProjectManager] = useState()
  const [employees, setEmployees] = useState()
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id:'', name:'None'},
    {id:'Open', name:'Open'},
    {id:'In  Progress', name:'In Progress'},
    {id:'Completed', name:'Completed'},
  ]

  const GetData = () => {
    AxiosInstance.get(`projectManager/`).then((res) =>{
      setProjectManager(res.data)
      console.log(res.data)
    });

    AxiosInstance.get(`employees/`).then((res) =>{
      setEmployees(res.data)
      console.log(res.data)
      setLoading(false)
    });
  }

  useEffect(() => {
    GetData();
  },[])

  const navigate = useNavigate()
  const defaultValues = {
    name: '',
    comments: '',
    status: '',
    start_date: null, //Para TimePickers es null y no ''
    end_date: null,
  }

  const schema = yup.object({
    name: yup.string().required('Nombre obligatorio'),
    status: yup.string().required('Estatus obligatorio'),
    employees: yup.array().min(1, 'Elige por lo menos un empleado de la lista '),
    comments: yup.string(),
    start_date: yup.date().required('Fecha Inicio obligatoria'),
    end_date: yup.date().required('Fecha Fin obligatoria').min(yup.ref('start_date'), 'Fecha Fin no puede ser menor a Fecha Inicio')
  })

  const {handleSubmit, control} = useForm({defaultValues:defaultValues, resolver: yupResolver(schema)})

  const submission = (data) => 
  {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")

    AxiosInstance.post( `project/`,{
      name: data.name,
      projectManager: data.projectManager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }
    )

    .then((res) =>{
      navigate(`/`)
    })
  }

  return (
    <div>
      { loading ? <p>Loading data...</p>:
        <form onSubmit={handleSubmit(submission)}>

        <Box sx={{display: 'flex', width:'100%', backgroundColor:'#0003ff', marginBottom:'10px'}}>
            <Typography sx={{marginLeft:'20px', color: '#fff'}}>
              Create records 
            </Typography>
          </Box>

          <Box sx={{display: 'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

            <Box sx={{display: 'flex', justifyContent: 'space-around', marginBottom:'40px'}}>
              <MyTextField
              label="Name"
              name="name"
              control={control}
              placeholder="Provide a project name"
              width = {'30%'}
              />

              <MyDatePickerField
              label="Start date"
              name="start_date"
              control={control}
              width = {'30%'}
              />

              <MyDatePickerField
              label="End date"
              name="end_date"
              control={control}
              width = {'30%'}
              />
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
              <MyMultiLineField
              label="Comments"
              name="comments"
              control={control}
              placeholder="Provide project comments"
              width = {'30%'}
              />

              <MySelectField
              label="Status"
              name="status"
              control={control}
              width = {'30%'}
              options = {hardcoded_options}
              />

                <MySelectField
                label="Project Manager"
                name="projectManager"
                control={control}
                width = {'30%'}
                options = {projectManager}
                />
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
              <MyMultiSelectField
              label="Employees"
              name="employees"
              control={control}
              width = {'30%'}
              options = {employees}
              />
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'start', marginTop:'40px'}}>
              <Button variant='contained' type='submit' sx={{width:'30%'}}>
                Submit
              </Button>
            </Box>

          </Box>
        </form>
      }
    </div>
  )
}

export default Create