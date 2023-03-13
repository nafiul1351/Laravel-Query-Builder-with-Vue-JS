<template>
	<main_header />
	<div class="full-body">
		<div class="body">
			<h2 class="body-title">Add data in 1st table</h2>
			<Form :validation-schema="schema" @submit="storeData" @invalid-submit="removeErrors">
				<div class="body-full-input-section">
					<div class="body-input-section">
						<label class="body-input-level">Text <span style="color:red">*</span></label>
						<Field class="body-input" id="text" type="text" name="text" placeholder="Please enter the text" />
						<ErrorMessage class="body-input-error" name="text" />
					</div>
					<div class="body-input-section">
						<label class="body-input-level">Number <span style="color:red">*</span></label>
						<Field class="body-input" id="number" type="number" name="number" placeholder="Please enter the number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 187 && event.keyCode !== 109 && event.keyCode !== 107 && event.keyCode !== 190 && event.keyCode !== 110" />
						<ErrorMessage class="body-input-error" name="number" />
					</div>
					<div class="body-input-section">
						<label class="body-input-level">Image</label>
						<Field class="body-input" id="image" type="file" name="image" />
						<span class="body-input-error-2" role="alert">{{$store.getters.getImageError}}</span>
					</div>
				</div>
				<button class="body-submit" type="submit">Add</button>
				<div style="text-align: center; margin-top: 10px;" v-if="$store.getters.getProgress">
					<strong style="font-size: 0.75rem; color: #007BFF;">UPLOADING FILE</strong>
					<div class="progress" style="margin-left: 5%; margin-right: 5%;">
						<div class="progress-bar progress-bar-striped" role="progressbar" :style="{width: Math.round($store.getters.getProgress) + '%'}">{{Math.round($store.getters.getProgress) + '%'}}</div>
					</div>
				</div>
			</Form>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-First-Table-Data'}">View 1st table datas</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Show-Second-Table-Data'}">View 2nd table datas</router-link>
		</div>
		<div class="link-section">
			<router-link class="link" :to="{name: 'Store-Data-In-Second-Table'}">Add data in 2nd table</router-link>
		</div>
	</div>
	<main_footer />
</template>
<script>
	import { onUnmounted } from 'vue';
	import { Form, Field, ErrorMessage } from 'vee-validate';
	import * as yup from 'yup';
	import { useStore } from 'vuex';
	import first_table from "../../js/first_table";
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
			const { stores } = first_table()
		    const schema = yup.object({
			  	text: yup.string().required('Text is required').typeError('Text must be a string').max(255, 'Text must not be greater than 255 characters'),
			    number: yup.number().required('Number is required').typeError('Number must be an integer')
			})
	        const storeData = async (values, { resetForm }) => {
	            await stores(values, { resetForm })
	        }
	        const removeErrors = async() => {
    			store.dispatch('removeImageError')
	        }
	        onUnmounted(
	        	async() => {
    				store.dispatch('removeImageError')
	        	}
	        )
			return{
				schema,
				storeData,
				removeErrors
			}
		}
	}
</script>