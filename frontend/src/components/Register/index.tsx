import React, { useState } from 'react'

export default function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    lead: '',
    ramal: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values)
  }

  




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input 
          type="text" 
          id="name" 
          placeholder="Enter name" 
          onChange={e=> setValues({...values, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" 
          id="email" 
          placeholder="Enter email" 
          onChange={e=> setValues({...values, email: e.target.value })}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
          type="password" 
          id="password" 
          placeholder="Enter password"
          onChange={e=> setValues({...values, password: e.target.value })} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            onChange={e=> setValues({...values, confirmPassword: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='department'>Department</label>
          <select id='department'  onChange={e=> setValues({...values, department: e.target.value })}>
            <option value=''>Select</option>
            <option value='IT'>IT</option>
            <option value='HR'>HR</option>
            <option value='Finance'>Finance</option>
          </select>
        </div>

        <div>
          <label htmlFor='lead'>Líder</label>
          <input 
          id="lead" 
          type="text" 
          placeholder='Qual o nome do chefe do seu departamento' 
          onChange={e=> setValues({...values, lead: e.target.value })}/>
        </div>

        <div>
          <label htmlFor='Ramal'>Ramal</label>
          <input id="Ramal" 
          placeholder='Qual o ramal do seu departamento?'
          onChange={e=> setValues({...values, ramal: e.target.value })}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
