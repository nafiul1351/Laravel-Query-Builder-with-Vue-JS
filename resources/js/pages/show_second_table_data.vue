<template>
	<main_header />
	<div class="full-body">
		<div class="body">
			<h2 class="body-title">All data in 2nd table</h2>
			<table id="table" class="table table-striped table-bordered">
	            <thead>
	                <tr>
	                    <th>Text</th>
	                    <th>First Table Text</th>
	                    <th>Actions</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr v-for="data in $store.getters.getDatas" :key="data.id">
	                	<td>{{ data.stext }}</td>
	                    <td>{{ data.text }}</td>
	                    <td>
	                        <a class="body-table-link" :href="'/update/data_2/' + data.id" @click.prevent="showEditForm(data.id)"><i class="fa fa-edit"></i></a>
	                        <button class="body-table-link" @click="destroyData(data.id)"><i class="fa fa-trash"></i></button>
	                    </td>
	                </tr>
	            </tbody>
	        </table>
		</div>
		<Form id="editform" class="full-body-edit-form-2" :validation-schema="schema" @submit="updateData">
			<Field type="number" name="id" v-model="$store.getters.getData.id" hidden />
			<div style="width: 100%; height: 35px;">
				<a class="full-body-edit-form-close-link" @click="closeEditForm"><i class="fa fa-times"></i></a>
			</div>
			<h2 class="body-title" style="text-align: center;">Update data of {{ $store.getters.getEditName }}</h2>
			<div class="body-full-input-section">
				<div class="body-input-section">
					<label class="body-input-level">Text <span style="color:red">*</span></label>
					<Field class="body-input" id="stext" type="text" name="stext" placeholder="Please enter the text" v-model="$store.getters.getData.stext" />
					<ErrorMessage class="body-input-error" name="stext" />
				</div>
				<div class="body-input-section">
					<label class="body-input-level">Select text <span style="color:red">*</span></label>
					<Field class="body-input" id="ft_id" name="ft_id" as="select">
						<option selected hidden value="">{{$store.getters.getData.text}}</option>
						<option v-for="firstTable in $store.getters.getFirstTables" :key="firstTable.id" :value="firstTable.id">{{ firstTable.text }}</option>
					</Field>
				</div>
				<Field type="number" name="ft_id_empty" v-model="$store.getters.getData.ft_id" hidden />
			</div>
			<button class="body-submit" style="width: 100px; display: block; margin-left: auto; margin-right: auto; margin-bottom: 10px;" type="submit">Update</button>
    	</Form>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Home'}">Add data in 1st table</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Store-Data-In-Second-Table'}">Add data in 2nd table</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-First-Table-Data'}">View 1st table datas</router-link>
		</div>
	</div>
	<main_footer />
</template>
<script>
	import { onMounted, onUnmounted } from 'vue';
	import { Form, Field, ErrorMessage } from 'vee-validate';
	import * as yup from 'yup';
	import { useStore } from 'vuex';
	import second_table from "../../js/second_table";
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
			const { show, getFirsttable, edit, update, destroy } = second_table()
			onMounted(
				async() => {
					show()
				}
			)
			const showEditForm = async(id) => {
				await getFirsttable()
				await edit(id)
				document.getElementById('editform').style.display = 'block'
			}
			const schema = yup.object({
			  	stext: yup.string().required('Text is required').typeError('Text must be a string').max(255, 'Text must not be greater than 255 characters')
			})
			const closeEditForm = async() => {
				store.dispatch('removeData')
				store.dispatch('removeEditName')
				store.dispatch('removeFirstTables')
				document.getElementById('editform').style.display = 'none'
			}
			const updateData = async (values, { resetForm }) => {
				if (values.ft_id === undefined) {
					values.ft_id = values.ft_id_empty
				}
	            await update(values)
	            $('#table').DataTable().destroy()
            	await show()
				resetForm({
					values: {
						id: values.id,
						stext: values.stext,
						ft_id: values.ft_id,
						ft_id_empty: values.ft_id_empty
					}
				})
	        }
			const destroyData = async (id) => {
	            await destroy(id);
	            $('#table').DataTable().destroy()
            	await show();
	        }
	        onUnmounted(
	        	async() => {
	        		store.dispatch('removeDatas')
	        		store.dispatch('removeData')
					store.dispatch('removeEditName')
					store.dispatch('removeFirstTables')
	        	}
	        )
			return{
				showEditForm,
				schema,
				closeEditForm,
				updateData,
				destroyData
			}
		}
	}
</script>