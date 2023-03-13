<template>
	<main_header />
	<div class="full-body">
		<div class="body">
			<h2 class="body-title">Add data in 2nd table</h2>
			<Form :validation-schema="schema" @submit="storeData">
				<div class="body-full-input-section">
					<div class="body-input-section">
						<label class="body-input-level">Text <span style="color:red">*</span></label>
						<Field class="body-input" id="stext" type="text" name="stext" placeholder="Please enter the text" />
						<ErrorMessage class="body-input-error" name="stext" />
					</div>
					<div class="body-input-section">
						<label class="body-input-level">Select text <span style="color:red">*</span></label>
						<Field class="body-input" id="ft_id" name="ft_id" as="select">
							<option selected disabled value="">None selected</option>
							<option v-for="firstTable in $store.getters.getFirstTables" :key="firstTable.id" :value="firstTable.id">{{ firstTable.text }}</option>
						</Field>
						<ErrorMessage class="body-input-error" name="ft_id" />
					</div>
				</div>
				<button class="body-submit" type="submit">Add</button>
			</Form>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-First-Table-Data'}">View 1st table datas</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-Second-Table-Data'}">View 2nd table datas</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Home'}">Add data in 1st table</router-link>
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
			const { getFirsttable, stores } = second_table()
			onMounted(
				async() => {
					getFirsttable()
				}
			)
		    const schema = yup.object({
			  	stext: yup.string().required('Text is required').typeError('Text must be a string').max(255, 'Text must not be greater than 255 characters'),
			    ft_id: yup.number().required('Text is required').typeError('')
			})
			const storeData = async (values, { resetForm }) => {
	            await stores(values, { resetForm })
	        }
	        onUnmounted(
	        	async() => {
	        		store.dispatch('removeFirstTables')
	        	}
	        )
			return{
				schema,
				storeData
			}
		}
	}
</script>