<template>
  <div id="app">
    <div v-if="loading" class="loader" />
    <div class="container my-6">
      <!-- INICIO DE PROCESOS-->

      <div class="card-header" v-if="mostrarForm">
        <h1>Bienvenido</h1>
        <a>Aquí inicia el proceso de registro para tu visita a </a>
        <br />
        <h4>"{{ this.nombre_visita }}"</h4>
        que se llevará a cabo del :

        <h4>{{ this.fecha_inicio }}</h4>
        al <br />
        <h4>{{ this.fecha_fin }}</h4>
        <br />
        <br />
        <div class="row">
          <a>Por favor ingresa tu correo electrónico:</a>

          <b-form-input
            v-model="$v.form3.email.$model"
            placeholder="ejemplo@gmail.com"
            :state="validateState2('email')"
          ></b-form-input>
          <b-form-invalid-feedback id="input-1-live-feedback"
            >Este es un campo obligatorio y debe ser una dirección de correo
            electrónico válida.</b-form-invalid-feedback
          >
          <button
            :disabled="habilitaBoton5"
            type="button"
            @click="buscaInfoPrevia()"
            class="btn btn mr-2 button_color"
          >
            <i aria-hidden="true"></i> Continuar
          </button>
        </div>
      </div>

      <!-- INFO DE CORREO SI EXISTE-->
      <div class="card-header" v-if="mostrarDatosCorreo">
        <div class="card-body">
          <div>
            <div class="row">
              <div class="col-6">
                <h4 style="text-align: center" class="inf_visit">
                  Encontramos esta información con tu correo:
                </h4>
                <table class="table table-bordered table-striped mb-0">
                  <tbody
                    v-for="(value, key) in infovisitante"
                    :key="key"
                    class="inf_visit"
                  >
                    <tr v-if="key != 'id_visitante'">
                      <td>{{ key }}:</td>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <br />
          <button
            class="btn btn mr-2 button_color"
            @click="
              onSubmitFast();
              closeDatosCorreo();
            "
          >
            Registrar visita
          </button>
          <button
            class="btn btn mr-2 button_color_red"
            @click="
              openInicio();
              closeDatosCorreo();
              resetForm3();
            "
          >
            ¿No eres tu?
          </button>
        </div>
      </div>

      <!-- AQUI COMIENZA PROCESO DE REGISTRO-->
      <div>
        <div class="card" v-if="mostrarForm1">
          <div class="container my-4">
            <div class="card-header">
              <label class="control-label h1">Registro de Visitantes</label>
              <h6>
                Para dar de alta a un visitante se requiere verificar su
                identidad.
              </h6>
              <h6>
                Por favor, revisa que el lugar esté bien iluminado y que los
                datos de la identificación sean legibles en la imagen.
              </h6>
            </div>

            <form-wizard
              title=""
              subtitle=""
              color="#27ae60"
              nextButtonText="SIGUIENTE"
              backButtonText="ATRÁS"
              finishButtonText="GUARDAR"
              :selected="true"
              @on-complete="onComplete"
            >
              <br />

              <!-- Tab formulario "Video de registro" -->
              <tab-content
                title="Video de registro"
                icon="fas fa-file-video"
                :before-change="procesarVideo"
              >
                <form
                  @submit.prevent="procesarVideo"
                  enctype="multipart/form-data"
                >
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
                          <span class="file-label"> Capturar video </span>
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

              <!-- Tab formulario "Identificación" -->
              <tab-content
                title="Identificación"
                icon="fas fa-id-card"
                :before-change="validar_identificacion"
              >
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
                          <span class="file-label"> Capturar imagen </span>
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

              <!-- Tab formulario "Datos generales" -->
              <tab-content
                title="Datos generales"
                icon="fas fa-file-alt"
                :before-change="validateTabTres"
              >
                <div class="form-group">
                  <b-form-group
                    id="input-group-1"
                    label="Nombre(s):"
                    :v="$v.form.nombre"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="$v.form.nombre.$model"
                      :state="validateState('nombre')"
                      type="Nombre(s)"
                      placeholder="Ingresa tu nombre"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio, no debe contener numeros y
                      debe contener al menos 3 letras.</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group
                    id="input-group-2"
                    label="Apellido Paterno:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="$v.form.apellido_paterno.$model"
                      :state="validateState('apellido_paterno')"
                      placeholder="Ingresa tu apellido paterno"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio, no debe contener números y
                      debe contener al menos 3 letras.</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    label="Apellido Materno:"
                    label-for="input-3"
                  >
                    <b-form-input
                      id="input-3"
                      v-model="$v.form.apellido_materno.$model"
                      :state="validateState('apellido_materno')"
                      placeholder="Ingresa tu apellido materno"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este campo no debe contener números y debe contener al
                      menos 3 letras.</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-form-group
                    id="input-group-4"
                    label="Género:"
                    label-for="input-4"
                  >
                    <b-form-select
                      id="input-4"
                      v-model="$v.form.genero.$model"
                      :state="validateState('genero')"
                      :options="generos"
                      required
                    ></b-form-select>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Debes elegir una opción.</b-form-invalid-feedback
                    >
                  </b-form-group>
                </div>
              </tab-content>

              <!-- Tab formulario "Datos de contacto" -->
              <tab-content
                title="Datos de contacto"
                icon="fas fa-phone-square"
                :before-change="validateTabCuatro"
              >
                <div class="form-group">
                  <b-form-group
                    id="input-group-5"
                    label="Teléfono celular:"
                    label-for="input-5"
                  >
                    <b-form-input
                      v-mask="maskphone"
                      id="input-5"
                      v-model.trim="$v.form.telefono_celular.$model"
                      :state="validateState('telefono_celular')"
                      placeholder="Ingresa tu teléfono celular"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio y debe contener 10
                      dígitos.</b-form-invalid-feedback
                    >
                  </b-form-group>

                  <b-form-group
                    id="input-group-6"
                    label="Teléfono particular:"
                    label-for="input-6"
                  >
                    <b-form-input
                      v-mask="maskphone"
                      id="input-6"
                      v-model="$v.form.telefono_particular.$model"
                      :state="validateState('telefono_particular')"
                      placeholder="Ingresa tu teléfono particular"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio y debe contener 10
                      dígitos.</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group
                    id="input-group-8"
                    label="Nombre de tu contacto de emergencia:"
                    label-for="input-8"
                  >
                    <b-form-input
                      id="input-8"
                      v-model="$v.form.nombre_contacto_emergencia.$model"
                      :state="validateState('nombre_contacto_emergencia')"
                      placeholder="Ingresa el nombre de tu contacto de emergencia"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio, no debe contener números y
                      debe contener al menos 3 letras.</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group
                    id="input-group-7"
                    label="Teléfono de emergencia:"
                    label-for="input-7"
                  >
                    <b-form-input
                      v-mask="maskphone"
                      id="input-7"
                      v-model="$v.form.numero_emergencia.$model"
                      :state="validateState('numero_emergencia')"
                      placeholder="Ingresa tu teléfono para emergencias"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-1-live-feedback"
                      >Este es un campo obligatorio y debe contener 10
                      dígitos.</b-form-invalid-feedback
                    >
                  </b-form-group>
                </div>
              </tab-content>
            </form-wizard>
          </div>
        </div>
      </div>
      <!-- MOSTRAMOS QR DE EXITO-->
      <div v-if="insert">
        <div class="container my-6">
          <div class="form-group" ref="QR_final">
            Tu registro a
            <h4>"{{ this.nombre_visita }}"</h4>
            que se llevará a cabo del :
            <h4>{{ this.fecha_inicio }}</h4>
            al
            <br />
            <h4>{{ this.fecha_fin }}</h4>
            ha sido exitoso, favor de mostrar el siguiente QR al entrar:
            <!-- <h4><a v-bind:href="this.url_visitante_id"></a>
              </h4> -->
            <img :src="'data:image/jpeg;base64,' + img_data" />
          </div>
        </div>
      </div>

      <modal
        name="modal-pasos"
        :clickToClose="false"
        :reset="true"
        :width="480"
        :height="245"
      >
        <div class="card-header">Información</div>
        <div class="card-body">
          <div class="form-group">
            <h6>
              {{ mensajemodal }}
            </h6>
          </div>
          <div class="form-group my-4" style="text-align: right">
            <b-button variant="info" @click="closeModalPasos">Aceptar</b-button>
          </div>
        </div> </modal
      ><!-- ends modal-->
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Vue from "vue";

import store from "../store";
import "vue-step-wizard/dist/vue-step-wizard.css";
import "vue-range-slider/dist/vue-range-slider.css";
import { validationMixin } from "vuelidate";
import {
  required,
  alpha,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

const emaiRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default {
  name: "BasicStepperForm",
  mixins: [validationMixin],
  components: {
    FormWizard,
    TabContent,
  },
  data() {
    return {
      file: "",
      uuid_visitante_file: "",
      file_folder: "",
      video_file_route: "",
      identificacion_file_route: "",
      imagen_identificacion_file: "",
      loading: false,
      uploadPercentage: 0,
      message: "",
      error: false,
      error_validacion: false,
      theStream: {},
      theRecorder: "",
      recordedChunks: [],
      maskphone: [
        "(",
        /\d/,
        /\d/,
        ") ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
      mensajemodal: "",
      nombre_visita: "",
      fecha_inicio: "",
      fecha_fin: "",
      email: "",
      generos: [{ text: "Seleccionar", value: null }, "Masculino", "Femenino"],
      /* isCameraOpen: false,
      isCameraOpen2: false,
      canvasWidth: "80%",
      canvasHeight: "80%",
      canvasHeightVideo: 470,
      canvasWidthVideo: 470,
      canvasHeightFoto: 250,
      canvasWidthFoto: 250, */
      items: null,
      match: "",
      mostrarForm: true,
      mostrarForm1: "",
      mostrarDatosCorreo: false,
      mensaje: "",
      uuid_visitante: "",
      ruta_imagen_rostro: "",
      ruta_imagen_identificacion: "",
      insert: false,
      url_visitante: process.env.VUE_APP_QR,
      url_visitante_id: "",
      img_data: [],
      auto: 0,
      isPhotoTaken: false,
      isPhotoTaken2: false,
      primerpaso: false,
      segundopaso: false,
      infovisitante_for_fast: null,
      infovisitante: {
        id_visitante: "this.infovisitante.id_visitante",
        NOMBRE: "this.infovisitante.nombre",
        "APELLIDO PATERNO": "this.infovisitante.apellido_paterno",
        "APELLIDO MATERNO": "this.infovisitante.apellido_materno",
        "TELEFONO CELULAR": "this.infovisitante.telefono_celular",
        "TELEFONO PARTICULAR": "this.infovisitante.telefono_particular",
        EMAIL: "this.infovisitante.email",
        "NOMBRE CONTACTO DE EMERGENCIA":
          "this.infovisitante.nombre_contacto_emergencia",
        "NUMERO DE EMERGENCIA": "this.infovisitante.numero_emergencia",
      },
      form: {
        id_detalle_visita: this.$route.params.id_detalle_visita,
        uuid_visitante: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono_particular: null,
        telefono_celular: null,
        numero_emergencia: null,
        nombre_contacto_emergencia: "",
        genero: null,
        email: "",
      },
      form2: {
        rostro_b64: "",
        identificacion_b64: "",
      },
      form3: {
        email: "",
      },
    };
  },
  validations: {
    form: {
      nombre: { required, minLength: minLength(3) },
      apellido_paterno: { required, alpha, minLength: minLength(3) },
      apellido_materno: { alpha, minLength: minLength(3) },
      genero: { required },
      telefono_celular: {
        required,
        maxLength: maxLength(14),
        minLength: minLength(14),
      },
      telefono_particular: {
        required,
        maxLength: maxLength(14),
        minLength: minLength(14),
      },
      numero_emergencia: {
        required,
        maxLength: maxLength(14),
        minLength: minLength(14),
      },
      nombre_contacto_emergencia: { required, minLength: minLength(3) },
    },
    form3: {
      email: { required, email },
    },
  },
  computed: {
    habilitaBoton: function () {
      var dato = true && this.form2.rostro_b64 && this.form2.identificacion_b64;
      return !dato;
    },
    habilitaBoton2: function () {
      var dato =
        true &&
        this.form.nombre &&
        this.form.nombre.length > 3 &&
        this.form.apellido_paterno &&
        this.form.apellido_paterno.length > 3 &&
        this.form.apellido_materno &&
        this.form.apellido_materno.length > 3 &&
        this.form.telefono_celular &&
        this.form.telefono_celular.length == 10 &&
        this.form.telefono_particular &&
        this.form.telefono_particular.length == 10 &&
        this.form.numero_emergencia &&
        this.form.numero_emergencia.length == 10 &&
        this.form.nombre_contacto_emergencia &&
        this.form.nombre_contacto_emergencia.length > 3;
      return !dato;
    },
    habilitaBoton5: function () {
      var dato = true && this.form3.email && emaiRegex.test(this.form3.email);
      return !dato;
    },
  },
  created() {
    this.obtenerinfoVisita();
  },
  methods: {
    getUserMedia(options, successCallback, failureCallback) {
      var api =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
      }
    },
    validar_identificacion: async function () {
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
      this.imagen_identificacion_file =
        this.$refs.imagen_identificacion_file.files[0];
      this.error = false;
      this.message = "";
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {};
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
    async uploadVideo() {
      const path = "/api/upload_video_rostros";
      const formData = new FormData();
      formData.append("file", this.file);
      this.getBase64(this.file);

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
          if (response.data.correct_upload) {
            instance.dismiss();
            this.loading = false;
            this.file_folder = response.data.file_folder;
            this.video_file_route = response.data.file_route;
            this.uuid_visitante_file = response.data.uuid_visitante;
            this.message = "Tu video se ha subido correctamente.";
            Vue.$toast.open({
              message: this.message,
              type: "success",
              duration: 3000,
            });

            this.error = false;
          } else {
            instance.dismiss();
            this.loading = false;

            this.message =
              "Tu video no se ha subido correctamente. Por favor, inténtalo nuevamente.";
            Vue.$toast.open({
              message: this.message,
              type: "error",
              duration: 5000,
            });

            this.error = true;
          }
        })
        .catch((err) => {
          console.log(err);
          instance.dismiss();
          this.loading = false;
          this.message =
            "Ha habido un con nuestro servidor, por favor inténtalo más tarde.";
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
        .post(
          path,
          {
            file_folder: this.file_folder,
            video_file_route: this.video_file_route,
            uuid_visitante: this.uuid_visitante_file,
          },
          {
            onUploadProgress: function () {
              this.loading = true;
            }.bind(this),
          }
        )
        .then((response) => {
          if (response.data.correct_analysis) {
            instance.dismiss();
            this.loading = false;
            this.message = "El video se analizó correctamente.";
            Vue.$toast.open({
              message: this.message,
              type: "success",
              duration: 3000,
            });
            this.error = false;
          } else {
            instance.dismiss();
            this.loading = false;
            this.message =
              "El video no parece adecuado. Por favor, intenta tomar uno nuevo.";
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
        message:
          "Estamos verificando tu identificación, espera un momento por favor",
        type: "info",
      });
      await axios
        .post(
          path,
          {
            file_folder: this.file_folder,
            video_file_route: this.video_file_route,
            identificacion_file_route: this.identificacion_file_route,
            uuid_visitante: this.uuid_visitante_file,
          },
          {
            onUploadProgress: function () {
              this.loading = true;
            }.bind(this),
          }
        )
        .then((response) => {
          if (response.data.match) {
            instance.dismiss();
            this.loading = false;
            /* this.message = "Los rostros coinciden"; */
            this.message = response.data.mensaje;
            Vue.$toast.open({
              message: this.message,
              type: "success",
              duration: 5000,
            });
            this.error_validacion = false;
          } else {
            instance.dismiss();
            this.loading = false;
            /* this.message =
              "Los rostros no coinciden. Por favor, inténtalo nuevamente."; */
            this.message = response.data.mensaje;
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
    async subirIdentificacion() {
      const path = "/api/upload-imagen-identificacion";
      const formData = new FormData();
      formData.append("file_folder", this.file_folder);
      formData.append("identificacion_file", this.imagen_identificacion_file);
      let instance = Vue.$toast.open({
        message:
          "Estamos subiendo la imagen de tu identificación, espera un momento por favor",
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
          if (response.data.correct_upload) {
            instance.dismiss();
            this.loading = false;
            this.identificacion_file_route = response.data.file_route;
            this.message = "Tu identificación se ha subido correctamente";
            Vue.$toast.open({
              message: this.message,
              type: "success",
              duration: 5000,
            });
            this.error_validacion = false;
          } else {
            instance.dismiss();
            this.loading = false;
            this.message =
              "La identificación no se ha subido correctamente. Por favor, inténtalo nuevamente.";
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
    validateState(nombre) {
      const { $dirty, $error } = this.$v.form[nombre];
      return $dirty ? !$error : null;
    },
    validateState2(email) {
      const { $dirty, $error } = this.$v.form3[email];
      return $dirty ? !$error : null;
    },
    obtenerinfoVisita() {
      const path_detalle_visita = "/api/detalle-visita/";
      axios
        .get(path_detalle_visita + this.$route.params.id_detalle_visita, {})
        .then((response) => {
          this.nombre_visita = response.data.nombre_visita;
          this.fecha_inicio = response.data.fecha_inicio;
          this.fecha_fin = response.data.fecha_fin;
        })
        .catch((error) => {
          this.mensaje_error =
            "Existe un problema con el servidor. Intenta nuevamente.";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          console.log(this.mensaje_error);
          console.log(error);
          store.commit("setSession", {});
        });
    },
    closeModalPasos() {
      this.$modal.hide("modal-pasos");
    },
    onSubmit() {
      const path_visitantes_visita = "/api/visitantes/visita/mobile";
      this.form.email = this.form3.email;
      this.form.uuid_visitante = this.uuid_visitante_file;
      this.form.ruta_imagen_rostro = this.ruta_imagen_rostro;
      this.form.ruta_imagen_identificacion = this.ruta_imagen_identificacion;
      axios
        .post(path_visitantes_visita, this.form)
        .then((response) => {
          this.url_visitante_id = this.url_visitante + response.data.id_visita;
          this.insert = response.data.insert;
          this.getQR(this.url_visitante_id);
          this.$v.form.$touch();
        })
        .catch((error) => {
          this.mensaje_error =
            "Existe un problema con el servidor. Intenta nuevamente.";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          console.log(this.mensaje_error);
          console.log(error);
          store.commit("setSession", {});
        });
    },
    onSubmitFast() {
      const path_visitantes_visita_rapida = "/api/visitantes/visita-rapida";
      this.form.id_detalle_visita = this.$route.params.id_detalle_visita;
      this.form.uuid_visitante = this.infovisitante_for_fast.uuid_visitante;
      this.form.email = this.infovisitante_for_fast.email;
      axios
        .post(path_visitantes_visita_rapida, this.form)
        .then((response) => {
          this.url_visitante_id = this.url_visitante + response.data.id_visita;
          this.insert = response.data.insert;
          this.getQR(this.url_visitante_id);
          this.$v.form.$touch();
        })
        .catch((error) => {
          this.mensaje_error =
            "Existe un problema con el servidor. Intenta nuevamente.";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          console.log(this.mensaje_error);
          console.log(error);
          store.commit("setSession", {});
        });
    },
    buscaInfoPrevia() {
      const path_visitantes_correo = "/api/visitantes/correo";
      if (this.form3.email) {
        axios
          .post(path_visitantes_correo, this.form3, {})
          .then((response) => {
            this.infovisitante_for_fast = response.data;
            console.log(
              "VIENDO INFORMACION COMPLETA DEL VISITANTE = " +
                this.infovisitante.id_visitante
            );
            this.infovisitante["id_visitante"] = response.data.id_visitante;
            this.infovisitante["NOMBRE"] = response.data.nombre;
            this.infovisitante["APELLIDO PATERNO"] =
              response.data.apellido_paterno;
            this.infovisitante["APELLIDO MATERNO"] =
              response.data.apellido_materno;
            this.infovisitante["TELEFONO CELULAR"] =
              response.data.telefono_celular;
            this.infovisitante["TELEFONO PARTICULAR"] =
              response.data.telefono_particular;
            this.infovisitante["EMAIL"] = response.data.email;
            this.infovisitante["NOMBRE CONTACTO DE EMERGENCIA"] =
              response.data.nombre_contacto_emergencia;
            this.infovisitante["NUMERO DE EMERGENCIA"] =
              response.data.numero_emergencia;
            this.closeInicio();
          })
          .catch((error) => {
            this.mensaje_error =
              "Existe un problema con el servidor. Intenta nuevamente.";
            Vue.$toast.open({
              message: this.mensaje_error,
              type: "error",
              duration: 8000,
            });
            console.log(this.mensaje_error);
            console.log(error);
            store.commit("setSession", {});
          });
      } else {
        console.log("NO ENCONTRE NADA");
      }
    },
    getQR(mensaje) {
      const path_qr = "/api/imagen_QR";
      const data = { datos_para_qr: mensaje };
      axios
        .post(path_qr, data)
        .then((response) => {
          this.img_data = response.data.encoded_qr_data;
          console.log(this.img_data);
        })
        .catch((error) => {
          this.mensaje_error =
            "Existe un problema con el servidor. Intenta nuevamente.";
          Vue.$toast.open({
            message: this.mensaje_error,
            type: "error",
            duration: 8000,
          });
          console.log(this.mensaje_error);
          console.log(error);
          store.commit("setSession", {});
        });
    },
    resetForm() {
      this.form = {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        genero: null,
        telefono_celular: null,
        telefono_particular: null,
        numero_emergencia: null,
        nombre_contacto_emergencia: "",
        email: "",
      };
    },
    resetForm3() {
      this.$v.form3.email.$reset();
      this.form3 = {
        email: "",
      };
    },
    closeInicio() {
      if (this.infovisitante.id_visitante) {
        this.mostrarDatosCorreo = true;
        this.mostrarForm = false;
      } else {
        this.mostrarForm1 = true;
        this.mostrarForm = false;
      }
    },
    openInicio() {
      this.mostrarForm = true;
    },
    closeDatosCorreo() {
      this.mostrarDatosCorreo = false;
    },
    onComplete() {
      this.onSubmit();
      this.mostrarForm1 = false;
    },
    validateTabTres: function () {
      if (
        this.form.nombre &&
        this.form.nombre.length > 3 &&
        this.form.apellido_paterno &&
        this.form.apellido_paterno.length > 3 &&
        this.form.apellido_materno &&
        this.form.apellido_materno.length > 3 &&
        this.form.genero
      ) {
        return true;
      } else {
        this.mensajemodal =
          "Por favor llena todos los campos para poder continuar";
        this.$modal.show("modal-pasos");
      }
    },
    validateTabCuatro: function () {
      if (
        this.form.telefono_celular &&
        this.form.telefono_celular.length == 14 &&
        this.form.telefono_particular &&
        this.form.telefono_particular.length == 14 &&
        this.form.numero_emergencia &&
        this.form.numero_emergencia.length == 14 &&
        this.form.nombre_contacto_emergencia &&
        this.form.nombre_contacto_emergencia.length > 3
      ) {
        return true;
      } else {
        this.mensajemodal =
          "Por favor llena todos los campos para poder continuar";
        this.$modal.show("modal-pasos");
      }
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
  color: #2c3e50;
  padding-left: 1em;
  padding-right: 1em;
  white-space: nowrap;
}
.file.is-primary .file-cta {
  background-color: #17a2b8;
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
.inf_visit > tr > td:first-child {
  min-width: 300px;
}
.overflow-clip {
  text-overflow: clip;
}
.button_color {
  color: #27ae60;
}
.button_color_red {
  color: rgb(209, 14, 8);
}
video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
h1 {
  font-family: sans-serif;
  color: #27ae60;
}
h2,
h3,
h4,
h5,
h6 {
  font-family: sans-serif;
  color: #2c3e50;
}
</style>