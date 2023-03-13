import { useStore } from 'vuex';
import $ from 'jquery';
export default function second_table(){
	const store = useStore()
	const getFirsttable = async() => {
		try{
			let response = await axios.get('/api/show-from-first-table')
			store.dispatch('setFirstTables', response.data)
		}
		catch(error){}
	}
	const stores = async(values, { resetForm }) => {
		try{
			let response = await axios.post('/api/store-in-second-table', values)
			toastr.success(response.data.message)
			resetForm({
				values: {
					stext: undefined,
					ft_id: undefined
				}
			})
		}
		catch(error){
			resetForm({
				values: {
					stext: values.stext,
					ft_id: values.ft_id
				}
			})
		}
	}
	const show = async() => {
		try{
			let response = await axios.get('/api/show-from-second-table')
			store.dispatch('setDatas', response.data)
			$(document).ready( function () {
				$('#table').DataTable({
					scrollX: true
				})
			})
		}
		catch(error){}
	}
	const edit = async (id) => {
		try{
			let response = await axios.get('/api/edit-from-second-table/' + id)
	        store.dispatch('setData', response.data)
			store.dispatch('setEditName', response.data.stext)
		}
        catch(error){}
    }
    const update = async (values) => {
		const formData = new FormData()
        formData.append('stext', values.stext)
        formData.append('ft_id', values.ft_id)
		formData.append('_method', 'patch')
        try {
            let response = await axios.post('/api/update-from-second-table/' + values.id, formData)
            toastr.success(response.data.message)
            document.getElementById('editform').style.display = 'none'
        }
        catch (error) {}
    }
	const destroy = async (id) => {
		try{
			let response = await axios.delete('/api/destroy-from-second-table/' + id)
			toastr.error(response.data.message)
		}
        catch(error){}
    }
	return{
		getFirsttable,
		stores,
		show,
		edit,
		update,
		destroy
	}
}