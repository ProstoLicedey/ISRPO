import { $host} from "./index";

export  const  getAllContacts = async () =>{
    const  {data} = await $host.get('getContacts/')
    return data
}
export  const  createContact = async (contact) =>{
    const  {data} = await $host.post('postContacts', contact)
    return data
}
export  const  deliteContact = async (id) =>{
    const  {data} = await $host.delete('DeleteContact/' + id )
    return data
}
export  const  putContact = async (id, contact) =>{
    const  {data} = await $host.put('PutContact/' + id, contact )
    return data
}