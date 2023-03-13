<template>
	<main_header />
	<div class="full-body">
		<div class="body">
			<h2 class="body-title">All data in 1st table</h2>
			<table id="table" class="table table-striped table-bordered">
	            <thead>
	                <tr>
	                    <th>Text</th>
	                    <th>Number</th>
	                    <th>Image</th>
	                    <th>Actions</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr v-for="data in $store.getters.getDatas" :key="data.id">
	                	<td>{{ data.text }}</td>
	                    <td>{{ data.number }}</td>
	                    <td v-if="data.image">
	                        <img style="height: 50px; width: 50px; border-radius: 5px;" :src="'/' + data.image">
	                    </td>
	                    <td v-else>No Image</td>
	                    <td>
	                        <a class="body-table-link" :href="'/update/data/' + data.id" @click.prevent="showEditForm(data.id)"><i class="fa fa-edit"></i></a>
	                        <button class="body-table-link" @click="destroyData(data.id)"><i class="fa fa-trash"></i></button>
	                    </td>
	                </tr>
	            </tbody>
	        </table>
		</div>
		<Form id="editform" class="full-body-edit-form" :validation-schema="schema" @submit="updateData" @invalid-submit="removeErrors">
			<Field type="number" name="id" v-model="$store.getters.getData.id" hidden />
			<div style="width: 100%; height: 35px;">
				<a class="full-body-edit-form-close-link" @click="closeEditForm"><i class="fa fa-times"></i></a>
			</div>
			<h2 class="body-title" style="text-align: center;">Update data of {{ $store.getters.getEditName }}</h2>
			<div class="body-full-input-section">
				<div class="body-input-section">
					<label class="body-input-level">Text <span style="color:red">*</span></label>
					<Field class="body-input" id="text" type="text" name="text" placeholder="Please enter the text" v-model="$store.getters.getData.text" />
					<ErrorMessage class="body-input-error" name="text" />
				</div>
				<div class="body-input-section">
					<label class="body-input-level">Number <span style="color:red">*</span></label>
					<Field class="body-input" id="number" type="number" name="number" placeholder="Please enter the number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 109 && event.keyCode !== 107 && event.keyCode !== 190 && event.keyCode !== 110" v-model="$store.getters.getData.number" />
					<ErrorMessage class="body-input-error" name="number" />
				</div>
				<div class="body-input-section">
					<label class="body-input-level">Image</label>
					<Field class="body-input" id="image" type="file" name="image" />
					<span id="errors" class="body-input-error-2" role="alert">{{$store.getters.getImageError}}</span>
				</div>
			</div>
			<button class="body-submit" style="width: 100px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 10px;" type="submit">Update</button>
			<div style="text-align: center; margin-bottom: 10px;" v-if="$store.getters.getProgress">
				<strong style="font-size: 0.75rem; color: #007BFF;">UPLOADING FILE</strong>
				<div class="progress" style="margin-left: 5%; margin-right: 5%;">
					<div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: Math.round($store.getters.getProgress) + '%'}">{{Math.round($store.getters.getProgress) + '%'}}</div>
				</div>
			</div>
    	</Form>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Home'}">Add data in 1st table</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Store-Data-In-Second-Table'}">Add data in 2nd table</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-Second-Table-Data'}">View 2nd table datas</router-link>
		</div>
	</div>
	<main_footer />
</template>
<script>
	import { onMounted, onUnmounted } from 'vue';
	import { Form, Field, ErrorMessage } from 'vee-validate';
	import * as yup from 'yup';
	import { useStore } from 'vuex';
	import first_table from "../../js/first_table";
	import $ from 'jquery';
	import main_header from '../pages/partials/header.vue';
  	import main_footer from '../pages/partials/footer.vue';
	export default{
		components: {
			main_header,
			main_footer,
			Form,
		    Field,
		    ErrorMessage
		},
		setup(){
			const store = useStore()
			const { show, edit, update, destroy } = first_table()
			onMounted(
				async() => {
					show()
				}
			)
			const showEditForm = async(id) => {
				await edit(id)
				document.getElementById('editform').style.display = 'block'
			}
			const schema = yup.object({
			  	text: yup.string().required('Text is required').typeError('Text must be a string').max(255, 'Text must not be greater than 255 characters'),
			    number: yup.number().required('Number is required').typeError('Number must be an integer')
			})
			const closeEditForm = async() => {
				store.dispatch('removeData')
				store.dispatch('removeEditName')
    			store.dispatch('removeImageError')
				document.getElementById('editform').style.display = 'none'
			}
			const updateData = async (values, { resetForm }) => {
	            await update(values)
	            $('#table').DataTable().destroy()
            	await show()
	            document.getElementById('image').value = null
				resetForm({
					values: {
						id: values.id,
						text: values.text,
						number: values.number,
						image: document.getElementById('image').files[0]
					}
				})
	        }
			const destroyData = async (id) => {
	            await destroy(id);
	            $('#table').DataTable().destroy()
            	await show();
	        }
	        const removeErrors = async() => {
    			store.dispatch('removeImageError')
	        }
	        onUnmounted(
	        	async() => {
	        		store.dispatch('removeDatas')
	        		store.dispatch('removeData')
	        		store.dispatch('removeEditName')
    				store.dispatch('removeImageError')
	        	}
	        )
			return{
				showEditForm,
				schema,
				closeEditForm,
				updateData,
				destroyData,
				removeErrors
			}
		}
	}
</script>