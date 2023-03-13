import { useStore } from 'vuex';
import $ from 'jquery';
export default function first_table(){
	const store = useStore()
	const onUploadProgress = progressEvent => {
		store.dispatch('setProgress', (progressEvent.loaded / progressEvent.total) * 100)
	}
	const stores = async(values, { resetForm }) => {
    	store.dispatch('removeImageError')
    	if (values.image === undefined) {
    		try{
				let response = await axios.post('/api/store-in-first-table', values, {
					headers: {'Content-Type':'multipart/form-data'}
				})
				toastr.success(response.data.message)
				document.getElementById('image').value = null
				resetForm({
					values: {
						text: undefined,
						number: undefined,
						image: document.getElementById('image').files[0]
					}
				})
			}
			catch(error){
				document.getElementById('image').value = null
				resetForm({
					values: {
						text: values.text,
						number: values.number,
						image: document.getElementById('image').files[0]
					}
				})
			}
    	}
    	else{
    		try{
				let response = await axios.post('/api/store-in-first-table', values, {
					headers: {'Content-Type':'multipart/form-data'},
					onUploadProgress
				})
				store.dispatch('removeProgress')
				toastr.success(response.data.message)
				document.getElementById('image').value = null
				resetForm({
					values: {
						text: undefined,
						number: undefined,
						image: document.getElementById('image').files[0]
					}
				})
			}
			catch(error){
				store.dispatch('removeProgress')
				if(error.response.status === 422){
					if(error.response.data.errors.image !== undefined){
						store.dispatch('setImageError', error.response.data.errors.image[0])
					}
				}
				document.getElementById('image').value = null
				resetForm({
					values: {
						text: values.text,
						number: values.number,
						image: document.getElementById('image').files[0]
					}
				})
			}
    	}
	}
	const show = async() => {
		try{
			let response = await axios.get('/api/show-from-first-table')
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
			let response = await axios.get('/api/edit-from-first-table/' + id)
			store.dispatch('setData', response.data)
			store.dispatch('setEditName', response.data.text)
		}
        catch(error){}
    }
    const update = async (values) => {
    	store.dispatch('removeImageError')
		const formData = new FormData()
        formData.append('text', values.text)
        formData.append('number', values.number)
        if(values.image !== undefined){
        	formData.append('image', values.image)
        }
		formData.append('_method', 'patch')
		if (values.image === undefined) {
			try {
	            let response = await axios.post('/api/update-from-first-table/' + values.id, formData, {
	            	headers: {'Content-Type':'multipart/form-data'}
	            })
	            toastr.success(response.data.message)
	            document.getElementById('editform').style.display = 'none'
	        }
	        catch (error) {}
		}
		else{
			try {
	            let response = await axios.post('/api/update-from-first-table/' + values.id, formData, {
	            	headers: {'Content-Type':'multipart/form-data'},
	            	onUploadProgress
	            })
	            store.dispatch('removeProgress')
	            toastr.success(response.data.message)
	            document.getElementById('editform').style.display = 'none'
	        }
	        catch (error) {
	        	store.dispatch('removeProgress')
	            if(error.response.status === 422){
					if(error.response.data.errors.image !== undefined){
						store.dispatch('setImageError', error.response.data.errors.image[0])
					}
				}
	        }
		}
    }
	const destroy = async (id) => {
		try{
			let response = await axios.delete('/api/destroy-from-first-table/' + id)
			toastr.error(response.data.message)
		}
        catch(error){}
    }
	return{
		stores,
		show,
		edit,
		update,
		destroy
	}
}