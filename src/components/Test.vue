<template>
  <div id="app">
    <div>
      <div v-if="loading" class="loader" />
      <form-wizard
        @on-complete="onComplete"
        shape="tab"
        color="#9b59b6"
        title="Registro"
        subtitle="Reconocimiento facial"
        nextButtonText="Siguiente"
        backButtonText="Anterior"
        finishButtonText="Finalizar"
      >
        <tab-content
          title="Video de registro"
          icon="fas fa-file-video"
          :before-change="procesarVideo"
        >
          <form @submit.prevent="procesarVideo" enctype="multipart/form-data">
            <div class="field">
              <div class="file is-boxed is-primary">
                <label class="file-label">
                  <input
                    type="file"
                    ref="file"
                    @change="selectFile"
                    class="file-input"
                    accept="video/*"
                    capture="capture"
                    style="display: none"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-video"></i>
                    </span>
                    <span class="file-label"> Seleccionar video </span>
                    <progress
                      v-if="uploadPercentage"
                      max="100"
                      :value.prop="uploadPercentage"
                    ></progress>
                  </span>
                </label>
                <br />
              </div>
            </div>
            <div>
              <span v-if="file" class="file-name">{{ file.name }}</span>
            </div>
          </form>
        </tab-content>
        <tab-content title="Identificación" icon="fas fa-id-card">
          <form @submit.prevent="" enctype="multipart/form-data">
            <div class="field">
              <div class="file is-boxed is-primary">
                <label class="file-label">
                  <input
                    type="file"
                    ref="imagen_identificacion_file"
                    @change="selectIdentificacionFile"
                    class="file-input"
                    accept="image/*"
                    capture="capture"
                    style="display: none"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-camera"></i>
                    </span>
                    <span class="file-label"> Seleccionar imagen </span>
                    <!--                     <progress
                      v-if="uploadPercentage"
                      max="100"
                      :value.prop="uploadPercentage"
                    ></progress> -->
                  </span>
                </label>
                <br />
              </div>
            </div>
            <div>
              <span v-if="imagen_identificacion_file" class="file-name">{{
                imagen_identificacion_file.name
              }}</span>
            </div>
          </form>
        </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import axios from "axios";
/* import 'bulma/css/bulma.css' */
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";


export default {
  name: "BasicStepperForm",
  components: {
    FormWizard,
    TabContent,
  },
  data() {
    return {
      file: "",
      file_folder:"",
      video_file_route:"",
      identificacion_file_route:"",
      imagen_identificacion_file: "",
      loading: false,
      uploadPercentage: 0,
      message: "",
      error: false,
      error_validacion: false
    };
  },
  methods: {
    onComplete: async function () {
      await this.subirIdentificacion();
      await this.compararRostros();
      return !this.error_validacion;
    },
    procesarVideo: async function () {
      await this.uploadVideo();
      await this.extraerRostrosVideo();
      return !this.error;
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.error = false;
      this.message = "";
    },
    selectIdentificacionFile() {
      console.log("selectIdentificacionFile")
      this.imagen_identificacion_file =
        this.$refs.imagen_identificacion_file.files[0];
      this.error = false;
      this.message = "";
    },
    async uploadVideo() {
      const path = "/api/upload_video_rostros";
      const formData = new FormData();
      formData.append("file", this.file);
      let instance = Vue.$toast.open({
        message: "Estamos procesando tu video. Espera un momento por favor",
        type: "info",
      });
      await axios
        .post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.loading = true;
          }.bind(this),
        })
        .then((response) => {
          if (response.data.correct_upload){
            /* console.log(response); */
          instance.dismiss();
          this.loading = false;
          this.file_folder = response.data.file_folder
          this.video_file_route = response.data.file_route
          this.message = "Tu video se ha subido correctamente.";
          Vue.$toast.open({
            message: this.message,
            type: "success",
            duration: 3000,
          });

          this.error = false;
          }
          else{
          console.log(response);
          instance.dismiss();
          this.loading = false;

          this.message = "Tu video no se ha subido correctamente. Por favor, inténtalo nuevamente.";
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 5000,
          });

          this.error = true;
          }
          
        })
        .catch((err) => {
          console.log(err)
          instance.dismiss();
          this.loading = false;
          this.message = "Ha habido un con nuestro servidor, por favor inténtalo más tarde.";
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 3000,
            position: "top",
          });
          this.error = true;
          console.log(err);
        });
    },
    async extraerRostrosVideo() {
      const path = "/api/extraer-rostros-video";
      let instance = Vue.$toast.open({
        message: "Estamos validando tu video, espera un momento por favor.",
        type: "info",
      });
      await axios
        .post(path, {"file_folder":this.file_folder,
        "video_file_route": this.video_file_route},
        {
          onUploadProgress: function () {
            this.loading = true;
          }.bind(this),
        }
        )
        .then((response) => {
          if (response.data.correct_analysis){
            console.log(response);
          instance.dismiss();
          this.loading = false;
          this.message = "El video se analizó correctamente.";
          Vue.$toast.open({
            message: this.message,
            type: "success",
            duration: 3000,
          });

          this.error = false;
          }
          else{
          console.log(response);
          instance.dismiss();
          this.loading = false;

          this.message = "El video no parece adecuado. Por favor, intenta tomar uno nuevo.";
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 5000,
          });

          this.error = true;
          }
          
        })
        .catch((err) => {
          instance.dismiss();
          this.loading = false;
          this.message = String(err);
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 3000,
            position: "top",
          });
          this.error = true;
          console.log(err);
        });
    },
    async compararRostros() {
      const path = "/api/comparar-rostros-video-identificacion";
      let instance = Vue.$toast.open({
        message: "Estamos verificando tu rostro, espera un momento por favor",
        type: "info",
      });
      await axios
        .post(path, {"file_folder":this.file_folder,
        "video_file_route": this.video_file_route,
        "identificacion_file_route":this.identificacion_file_route},
        {
          onUploadProgress: function () {
            this.loading = true;
          }.bind(this),
        })
        .then((response) => {
          if (response.data.match){
            console.log(response);
          instance.dismiss();
          this.loading = false;
          this.message = "Los rostros coinciden";
          Vue.$toast.open({
            message: this.message,
            type: "success",
            duration: 8000,
          });

          this.error_validacion = false;
          }
          else{
          console.log(response);
          instance.dismiss();
          this.loading = false;

          this.message = "Los rostros no coinciden. Por favor, inténtalo nuevamente.";
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 8000,
          });

          this.error_validacion = true;
          }
          
        })
        .catch((err) => {
          instance.dismiss();
          this.loading = false;
          this.message = String(err);
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 3000,
            position: "top",
          });
          this.error_validacion = true;
          console.log(err);
        });
    },
    async subirIdentificacion() {
      const path = "/api/upload-imagen-identificacion";
      const formData = new FormData();
      
      formData.append("file_folder",this.file_folder);
      formData.append("identificacion_file", this.imagen_identificacion_file);
      let instance = Vue.$toast.open({
        message: "Estamos subiendo la imagen de tu identificación, espera un momento por favor",
        type: "info",
      });
      await axios
        .post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            this.loading = true;
          }.bind(this),
        })
        .then((response) => {
          if (response.data.correct_upload){
            console.log(response);
          instance.dismiss();
          this.loading = false;
          this.identificacion_file_route = response.data.file_route

          this.message = "Tu identificación se ha subido correctamente";
          Vue.$toast.open({
            message: this.message,
            type: "success",
            duration: 5000,
          });

          this.error_validacion = false;
          }
          else{
          console.log(response);
          instance.dismiss();
          this.loading = false;

          this.message = "La identificación no se ha subido correctamente. Por favor, inténtalo nuevamente.";
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 5000,
          });

          this.error_validacion = true;
          }
          
        })
        .catch((err) => {
          instance.dismiss();
          this.loading = false;
          this.message = String(err);
          Vue.$toast.open({
            message: this.message,
            type: "error",
            duration: 3000,
            position: "top",
          });
          this.error_validacion = true;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.file {
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.file-icon {
  padding-left: 40%;
}
.file-cta,
.file-name {
  border-color: #dbdbdb;
  border-radius: 4px;
  font-size: 1em;
  color: #9b59b6;
  padding-left: 1em;
  padding-right: 1em;
  white-space: nowrap;
}
.file.is-primary .file-cta {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}
.file.is-boxed .file-label {
  flex-direction: column;
}
.file-label {
  align-items: stretch;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}
.fa,
.fab,
.fal,
.far,
.fas {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.btn-primary {
  background-color: rgb(155, 89, 182);
  border-color: rgb(155, 89, 182);
  color: white;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 4px;
}
</style>