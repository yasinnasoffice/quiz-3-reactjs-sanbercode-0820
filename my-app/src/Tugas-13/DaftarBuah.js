import React, {useState, useEffect} from "react"
import axios from "axios"
import "./DaftarBuah.css"

const DaftarBuah = () => {  
  const [daftarBuah, setDaftarBuah] =  useState(null)
  const [input, setInput]  =  useState({name: "", price: "", weight: 0, id: null})

  useEffect( () => {
    if (daftarBuah === null){
      axios.get(`http://backendexample.sanbercloud.com/api/fruits`)
      .then(res => {
        setDaftarBuah(res.data.map(el=>{ return {id: el.id, name: el.name, price: el.price, weight: el.weight }} ))
      })
    }
  }, [daftarBuah])
  
  const handleDelete = (event) => {
    let idDataBuah = parseInt(event.target.value)

    let newdaftarBuah = daftarBuah.filter(el => el.id !== idDataBuah)

    axios.delete(`http://backendexample.sanbercloud.com/api/fruits/${idDataBuah}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarBuah([...newdaftarBuah])
    
  }
  
  const handleEdit = (event) =>{
    let idDataBuah = parseInt(event.target.value)
    let dataBuah = daftarBuah.find(x=> x.id === idDataBuah)
    setInput({name: dataBuah.name, price: dataBuah.price, weight: dataBuah.weight, id: idDataBuah})
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "price":
      {
        setInput({...input, price: event.target.value});
        break
      }
      case "weight":
      {
        setInput({...input, weight: event.target.value});
          break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    let price = input.price.toString()
    

    if (input.id === null){        
      axios.post(`http://backendexample.sanbercloud.com/api/fruits`, {name, price, weight: input.weight})
      .then(res => {
          setDaftarBuah([
            ...daftarBuah, 
            { id: res.data.id, 
              name, 
              price,
              weight: input.weight
            }])
      })
    }else{
      axios.put(`http://backendexample.sanbercloud.com/api/fruits/${input.id}`, {name, price, weight: input.weight})
      .then(() => {
          let dataBuah = daftarBuah.find(el=> el.id === input.id)
          dataBuah.name = name
          dataBuah.price = price
          dataBuah.weight = input.weight
          setDaftarBuah([...daftarBuah])
      })
    }

    // reset input form to default
    setInput({name: "", price: "", weight: 0, id: null})

  }

  return(
    <>
      <h1>Daftar Harga Buah</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Berat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>

            {
              daftarBuah !== null && daftarBuah.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.weight/1000} Kg</td>
                    <td>
                      <button onClick={handleEdit} value={item.id}>Edit</button>
                      &nbsp;
                      <button onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Form Daftar Harga Buah</h1>

      <div style={{width: "50%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          <form onSubmit={handleSubmit}>
            <label style={{float: "left"}}>
              Nama:
            </label>
            <input style={{float: "right"}} type="text" required name="name" value={input.name} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Harga:
            </label>
            <input style={{float: "right"}} type="text" required name="price" value={input.price} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Berat (dalam gram):
            </label>
            <input style={{float: "right"}} type="number" required name="weight" value={input.weight} onChange={handleChange}/>
            <br/>
            <br/>
            <div style={{width: "100%", paddingBottom: "20px"}}>
              <button style={{ float: "right"}}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DaftarBuah
