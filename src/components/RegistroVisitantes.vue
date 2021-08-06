<template>
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
        <!-- <label for="idvisita" class="col-form-label mr-4"
          >Correo electronico:</label
        > -->
        <b-form-input
          v-model="$v.form3.email.$model"
          placeholder="ejemplo@gmail.com"
          :state="validateState2('email')"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback"
          >Este es un campo obligatorio y debe ser una dirección de correo
          electronico valida.</b-form-invalid-feedback
        >
        <!--small class="notValid">{{msgName}}</small-->
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
    <!-- end row -->

    <!-- INFO DE CORREO SI EXISTE-->
    <div class="card-header" v-if="mostrarDatosCorreo">
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-6">
              <h4 style="text-align: center" class="inf_visit">
                Encontramos esta informacion con tu correo:
              </h4>
              <table class="table table-bordered table-striped mb-0">
                <tbody class="inf_visit">
                  <tr>
                    <td>NOMBRE</td>
                    <td>{{ infovisitante.nombre }}</td>
                  </tr>
                  <tr>
                    <td>APELLIDO PATERNO</td>
                    <td>{{ infovisitante.apellido_paterno }}</td>
                  </tr>
                  <tr>
                    <td>APELLIDO MATERNO</td>
                    <td>{{ infovisitante.apellido_materno }}</td>
                  </tr>
                  <tr>
                    <td>TELEFONO CELULAR</td>
                    <td>{{ infovisitante.telefono_celular }}</td>
                  </tr>
                  <tr>
                    <td>TELEFONO PARTICULAR</td>
                    <td>{{ infovisitante.telefono_particular }}</td>
                  </tr>
                  <tr>
                    <td>EMAIL</td>
                    <td>{{ infovisitante.email }}</td>
                  </tr>
                  <tr>
                    <td>NOMBRE CONTACTO DE EMERGENCIA</td>
                    <td>{{ infovisitante.nombre_contacto_emergencia }}</td>
                  </tr>
                  <tr>
                    <td>NUMERO DE EMERGENCIA</td>
                    <td>{{ infovisitante.numero_emergencia }}</td>
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
                <!-- <h6>
                  Se debe tomar una fotografía de frente y una imagen de su
                  identificación.
                </h6> -->
                <h6>
                  Por favor, revisa que el lugar esté bien iluminado y que los
                  datos de la identificación sean legibles en la imagen.
                </h6>
              </div>
  <form-wizard title="" subtitle="" 
              color="#27ae60"
              nextButtonText="SIGUIENTE"
              backButtonText="ATRAS" 
              finishButtonText="GUARDAR" 
              :selected="true" 
              @on-complete="onComplete">
              
              <br />
    <tab-content title="Rostro" :before-change="validateTabUno">
         <b-form>
            <b-form-group>
              
              <h5>Por favor, captura una imagen con tu rostro de frente.</h5>
              
              <div>
                <div v-if="isCameraOpen" class="camera-canvas">
                  <video
                    v-show="true"
                    ref="camera"
                    :width="canvasWidth"
                    :height="canvasHeight"
                    playsinline
                    autoplay
                  ></video>
                <div>
                  <br>
                </div>
                  
                </div>
                <div style="display: flex; justify-content: flex-start">
                <img
                  style="height: 100px"
                  v-if="isCameraOpen"
                  src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                  @click="capture"
                />
                <div class="camera-button">
                  <button
                    type="button"
                    style="
                      margin-left: 10%;
                      background-color: white;
                      border: 0px;
                    "
                    @click="toggleCamera"
                  >
                    <div v-show="!isCameraOpen">
                      <h6>ROSTRO</h6>
                    </div>
                    <div>
                      <span v-if="!isCameraOpen"
                        ><img
                          style="height: 100px"
                          class="button-img"
                          src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                      /></span>
                    </div>
                  </button>
                </div>
                <canvas
                    v-show="isPhotoTaken"
                    id="photoTaken"
                    ref="canvas"
                    :width="canvasWidthFoto"
                    :height="canvasHeightFoto"
                  ></canvas>
              </div>
                <!-- <button v-if="primerpaso"
                  :disabled="habilitaBoton3"
                  class="btn btn mr-2 button_color_red"
                  @click="onResetCamRostro"
                  variant="danger"
                >
                  Tomar otra fotografia
                </button> -->
              </div>
            </b-form-group>
          </b-form>
    </tab-content>

    <tab-content  title="Identificacion" :before-change="validateTabDos">
          <b-form @submit="postRespuesta">
            <b-form-group>
                <br />
                <h5>Por favor, captura una imagen del frente de tu identificación (INE).</h5>
                <div>
                  <div v-if="isCameraOpen2" class="camera-canvas">
                    <video
                      v-show="true"
                      ref="camera2"
                      :width="canvasWidth"
                      :height="canvasHeight"
                      playsinline
                      autoplay
                    ></video>
                  <div>
                    <br>
                  </div>
                </div>
                  <div style="display: flex; justify-content: flex-start">
                  <img
                    style="height: 100px"
                    v-if="isCameraOpen2"
                    src="https://img.icons8.com/material-outlined/50/000000/camera--v1.png"
                    class="button-img camera-shoot"
                    @click="capture2"
                  />
                  <div class="camera-button">
                    <button
                      type="button"
                      class="button is-rounded cam-button"
                      style="
                        margin-left: 10%;
                        background-color: white;
                        border: 0px;
                      "
                      @click="toggleCamera2"
                    >
                      <div v-show="!isCameraOpen2">
                        <h6>IDENTIFICACIÓN</h6>
                      </div>
                      <div>
                        <span v-if="!isCameraOpen2"
                          ><img
                            style="height: 100px"
                            class="button-img"
                            src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                        /></span>
                      </div>
                    </button>
                  </div>
                    <canvas
                      v-show="isPhotoTaken2"
                      id="photoTaken"
                      ref="canvas2"
                      :width="canvasWidthFoto"
                      :height="canvasHeightFoto"
                    ></canvas>
                </div>
                </div>
            </b-form-group>

            <!-- <button v-if="segundopaso"
              :disabled="habilitaBoton4"
              class="btn btn mr-2 button_color_red"
              type="reiniciar"
              @click="onResetCamIdentificacion"
              variant="danger"
            >
              Tomar otra fotografia
            </button> -->
          </b-form>
    </tab-content>
        <tab-content title="Datos generales" :before-change="validateTabTres">
              <div class="form-group">
                 <b-form-group
                id="input-group-1"
                label="Nombre(s):"
                :class="className"
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
                  >Este es un campo obligatorio, no debe contener numeros y debe
                  contener al menos 3 letras.</b-form-invalid-feedback
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
                  >Este es un campo obligatorio, no debe contener numeros y debe
                  contener al menos 3 letras.</b-form-invalid-feedback
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
                  >Este campo no debe contener numeros y debe contener al menos
                  3 letras.</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Genero:"
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
    <tab-content title="Datos de contacto" :before-change="validateTabCuatro">
    <div class="form-group">
      <b-form-group
                id="input-group-5"
                label="Telefono celular:"
                label-for="input-5"
              >
                <b-form-input  v-mask="maskphone"
                  id="input-5"
                  type="telefono_celular"
                  v-model.trim="$v.form.telefono_celular.$model"
                  :state="validateState('telefono_celular')"
                  placeholder="Ingresa tu telefono celular"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback"
                  >Este es un campo obligatorio y debe contener 10
                  digitos.</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                id="input-group-6"
                label="Telefono particular:"
                label-for="input-6"
              >
                <b-form-input v-mask="maskphone"
                  id="input-6"
                  @input="acceptNumber"
                  v-model="$v.form.telefono_particular.$model"
                  :state="validateState('telefono_particular')"
                  placeholder="Ingresa tu telefono particular"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback"
                  >Este es un campo obligatorio y debe contener 10
                  digitos.</b-form-invalid-feedback
                >
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Telefono de emergencia:"
                label-for="input-7"
              >
                <b-form-input v-mask="maskphone"
                  id="input-7"
                  v-model="$v.form.numero_emergencia.$model"
                  :state="validateState('numero_emergencia')"
                  placeholder="Ingresa tu telefono para emergencias"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback"
                  >Este es un campo obligatorio y debe contener 10
                  digitos.</b-form-invalid-feedback
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
                  >Este es un campo obligatorio, no debe contener numeros y debe
                  contener al menos 3 letras.</b-form-invalid-feedback
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

            <div class="form-group">
              Tu registro a
              <h4>"{{ this.nombre_visita }}"</h4>
              que se llevará a cabo del :
              <h4>{{ this.fecha_inicio }}</h4>
              al 
              <br/>
              <h4>{{ this.fecha_fin }}</h4>
              ha sido exitoso, favor de mostrar el siguiente QR al entrar:
              <p>{{ this.url_visitante_id }}</p>
              <img :src="'data:image/jpeg;base64,' + img_data" />
            </div>
      </div>
    </div>


    <modal
      name="modal-fallo"
      :clickToClose="false"
      :reset="true"
      :width="480"
      :height="245"
    >
      <div class="card">
        <div class="card-header">Información</div>
        <div class="card-body">
          <div class="form-group">
            <h6>
              Tu informacion NO se guardo correctamente, intenta nuevamnete
            </h6>
          </div>
          <div class="form-group my-4" style="text-align: right">
            <b-button
              variant="info"
              @click="closeModalFallo"
              @submit="resetForm"
              >Aceptar</b-button
            >
          </div>
        </div>
      </div> </modal
    ><!-- ends modal-->

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
              {{mensajemodal}}
            </h6>
          </div>
          <div class="form-group my-4" style="text-align: right">
            <b-button
              variant="info"
              @click="closeModalPasos"
              >Aceptar</b-button
            >
          </div>
        </div>
 </modal><!-- ends modal-->
  </div>
</template>



<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import Vue from "vue";
import store from "../store";
import "vue-step-wizard/dist/vue-step-wizard.css";
import router from "../router";
import axios from "axios";
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
    TabContent
  },
   data() {
    return {
      maskphone: ['(', /\d/, /\d/, ') ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      mensajemodal: "",
      animate: true,
      nombre_visita: "",
      fecha_inicio: "",
      fecha_fin: "",
      email: "",
      idvisita: "",
      infovisitante: "",
      imagen: this.$refs.imagenrostro,
      generos: [{ text: "Seleccionar", value: null }, "Masculino", "Femenino"],
      isCameraOpen: false,
      isCameraOpen2: false,
      canvasHeightVideo: 470,
      canvasWidthVideo: 470,
      canvasHeightFoto: 250,
      canvasWidthFoto: 250,
      items: null,
      match: "",
      mostrarForm: true,
      mostrarForm1: "",
      formRegRapido: "",
      mostrarCamaras: true,
      mostrarCamaraRostro: true,
      mostrarFormDatPers: true,
      mostrarFormDatCont: false,
      mostrarDatosCorreo: false,
      mensaje: "",
      uuid_visitante: "",
      ruta_imagen_rostro: "",
      ruta_imagen_identificacion: "",
      insert: false,
      id_detalle_visita_aux: 0,
      url_visitante: "http://localhost:5000/api/visitas-ingreso/",
      url_visitante_id: "",
      img_data: [],
      auto: 0,
      isPhotoTaken: false,
      isPhotoTaken2: false,
      primerpaso: false,
      segundopaso: false,
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
  watch: {
      telefono_celular(){
        var x = this.$v.form.telefono_celular.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.$v.form.telefono_celular = !x[2] && !x[3] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.msgTel="";
        this.classTel="greenColor correct";
        if(this.$v.form.telefono_celular.length!=14) {  // mejor poner aqui una expresion regular
          this.msgTel="El teléfono es incorrecto. Recuerda que te enviaremos un sms de confirmación para completar el registro.";
          this.classTel="redColor incorrect";
        }
      }
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
    validateState(nombre) {
      const { $dirty, $error } = this.$v.form[nombre];
      return $dirty ? !$error : null;
    },
    validateState2(email) {
      const { $dirty, $error } = this.$v.form3[email];
      return $dirty ? !$error : null;
    },
    async postRespuesta() {
      await axios 
        .post(
          "http://127.0.0.1:5000/validacion-rostro-identificacion",
          this.form2
        )
        .then((response) => {
          console.log(response.data);
          this.uuid_visitante = response.data.uuid_visitante;
          this.ruta_imagen_rostro = response.data.ruta_imagen_rostro;
          this.ruta_imagen_identificacion = response.data.ruta_imagen_identificacion;
          this.mensaje = response.data.mensaje;
          this.match = response.data.match;
          this.mostrarCamaras = !this.match;
          this.toggleCamera();
          this.toggleCamera2();
          this.stopCameraStream();
          this.$modal.show("modal-camaras");
          // alert(response.data.mensaje);
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
    obtenerinfoVisita() {
      console.log(this.$route.params.id_detalle_visita);
      axios
        .get(
          "http://127.0.0.1:5000/detalle-visita/" +
            this.$route.params.id_detalle_visita,
          {}
        )
        .then((response) => {
          this.nombre_visita = response.data.nombre_visita;
          this.fecha_inicio = response.data.fecha_inicio;
          this.fecha_fin = response.data.fecha_fin;
          console.log(this.evento);
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
    closeModalCamaras() {
      this.$modal.hide("modal-camaras");
    },
    closeModalFallo() {
      this.$modal.hide("modal-fallo");
    },
    closeModalPasos() {
      this.$modal.hide("modal-pasos");
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
      } else {
        this.isCameraOpen = true;
        this.startCameraStream();
      }
    },
    startCameraStream() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors." + error);
        });
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },
    capture() {
      this.isPhotoTaken = !this.isPhotoTaken;
      const FLASH_TIMEOUT = 50;
      let self = this;
      setTimeout(() => {
        const context = self.$refs.canvas.getContext("2d");
        context.drawImage(
          self.$refs.camera,
          0,
          0,
          self.canvasWidthFoto,
          self.canvasHeightFoto
        );
        const dataUrl = self.$refs.canvas
          .toDataURL()
          .replace("data:image/png;base64,", "");
        console.log(dataUrl);
        this.form2.rostro_b64 = dataUrl;
        this.primerpaso = true;
        self.addToPhotoGallery(dataUrl);
        self.isCameraOpen = false;
        self.stopCameraStream();
      }, FLASH_TIMEOUT);
    },
    toggleCamera2() {
      if (this.isCameraOpen2) {
        this.isCameraOpen2 = false;
        this.isPhotoTaken2 = false;
      } else {
        this.isCameraOpen2 = true;
        this.startCameraStream2();
      }
    },
    startCameraStream2() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera2.srcObject = stream;
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors." + error);
        });
    },
    addToPhotoGallery(dataURI) {
      this.items.push({
        src: dataURI,
        thumbnail: dataURI,
        w: this.canvasWidth,
        h: this.canvasHeight,
        alt: "some numbers on a grey background", // optional alt attribute for thumbnail image
      });
    },
    capture2() {
      this.isPhotoTaken2 = !this.isPhotoTaken2;
      const FLASH_TIMEOUT = 50;
      let self = this;
      setTimeout(() => {
        const context = self.$refs.canvas2.getContext("2d");
        context.drawImage(
          self.$refs.camera2,
          0,
          0,
          self.canvasWidthFoto,
          self.canvasHeightFoto
        );
        const dataUrl = self.$refs.canvas2
          .toDataURL()
          .replace("data:image/png;base64,", "");
        console.log(dataUrl);
        this.form2.identificacion_b64 = dataUrl;
        this.segundopaso = true;
        self.addToPhotoGallery(dataUrl);
        self.isCameraOpen = false;
        self.stopCameraStream();
      }, FLASH_TIMEOUT);
    },
    onSubmit() {
      this.form.email = this.form3.email;
      this.form.uuid_visitante = this.uuid_visitante;
      this.form.ruta_imagen_rostro = this.ruta_imagen_rostro;
      this.form.ruta_imagen_identificacion = this.ruta_imagen_identificacion;
      this.id_detalle_visita_aux = this.form.id_detalle_visita;
      console.log(this.form);
      axios
        .post("http://127.0.0.1:5000/visitantes/visita", this.form)
        .then((response) => {
          this.uuid_visitante = response.data.uuid_visitante;
          this.url_visitante_id = this.url_visitante + response.data.id_visita;
          this.insert = response.data.insert;
          this.mostrarFormDatCont=false;
          this.getQR(this.url_visitante_id);
          this.$refs["my-modal"].show();
          console.log(response.data);
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
      this.form.id_detalle_visita = this.$route.params.id_detalle_visita;
      this.form.uuid_visitante = this.infovisitante.uuid_visitante;
      this.form.email = this.infovisitante.email;
      console.log(this.form);
      axios
        .post("http://127.0.0.1:5000/visitantes/visita-rapida", this.form)
        .then((response) => {
          this.uuid_visitante = response.data.uuid_visitante;
          this.url_visitante_id = this.url_visitante + response.data.id_visita;
          this.insert = response.data.insert;
          this.getQR(this.url_visitante_id);
          this.$refs["my-modal"].show();
          console.log(response.data);
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
      if (this.form3.email) {
        axios
          .post("http://localhost:5000/visitantes/correo", this.form3, {})
          .then((response) => {
            this.infovisitante = response.data;
            console.log(
              "VIENDO INFORMACION COMPLETA DEL VISITANTE = " +
                this.infovisitante.id_visita
            );
            console.log(this.infovisitante);
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
        console.log("NO ENCONTTRE NADA");
      }
      //this.$refs['my-modal'].show();
    },
    getQR(mensaje) {
      const path = "http://localhost:5000/imagen_QR";
      const data = { datos_para_qr: mensaje };
      axios
        .post(path, data)
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
    onResetCamRostro() {
      this.isPhotoTaken = !this.isPhotoTaken;
      this.form2.rostro_b64 = null;
      this.toggleCamera();
      this.stopCameraStream();
    },
    onResetCamIdentificacion() {
      this.isPhotoTaken2 = !this.isPhotoTaken2;
      this.form2.identificacion_b64 = null;
      this.toggleCamera2();
      this.stopCameraStream();
    },
    openConfirmaPage: function () {
      router.push({ name: "ConfirmaRegistro" });
    },
    openRegistro() {
      this.mostrarForm1 = true;
    },
    closeInicio() {
      if (this.infovisitante.id_visitante) {
        this.mostrarDatosCorreo = true;
        this.mostrarForm = false;
      } else {
        this.mostrarForm1 = true;
        this.mostrarForm = false;
        this.toggleCamera();
      }
    },
    openInicio() {
      this.mostrarForm = true;
    },
    openDatosContact() {
      this.mostrarFormDatCont = true;
    },
    closeDatosPers() {
      this.mostrarFormDatPers = false;
    },
    openRegRapido() {
      this.formRegRapido = true;
    },
    claseRegRapido() {
      this.formRegRapido = false;
    },
    closeModalQR() {
      this.insert = false;
    },
    closeDatosCorreo() {
      this.mostrarDatosCorreo = false;
    },
    openDatosCorreo() {
      if (this.infovisitante != null) {
        this.mostrarDatosCorreo = true;
      }
    },
   regresarInicio() {
     this.openInicio();
     this.mostrarForm1 = false;
    },
    onComplete(){
    this.onSubmit();
    this.mostrarForm1 = false;
    },
   validateTabUno: function(){
     if(this.primerpaso == true){
        this.isCameraOpen2 = true;
        this.startCameraStream2();
       return true
     }else
     this.mensajemodal = "Por favor toma una fotografia de tu Rostro para poder continuar" 
     this.$modal.show("modal-pasos");
     return false;
   },
  validateTabDos: async function(){
     if(this.segundopaso == true){
     await this.postRespuesta();
     if(this.match == true ){
       this.mensajemodal = this.mensaje;
       this.$modal.show("modal-pasos");
       return true
     }else{
       this.mensajemodal = this.mensaje;
       this.$modal.show("modal-pasos");
     }
     }else 
     this.mensajemodal = "Por favor toma una fotografia de tu Identificacion para poder continuar"
      this.$modal.show("modal-pasos");
     return false;
   },
   validateTabTres: function(){
     if(
        this.form.nombre &&
        this.form.nombre.length > 3 &&
        this.form.apellido_paterno &&
        this.form.apellido_paterno.length > 3 &&
        this.form.apellido_materno &&
        this.form.apellido_materno.length > 3 &&
        this.form.genero){
        return true;
        }else{
          this.mensajemodal= "Por favor llena todos los campos para poder contiuar"
          this.$modal.show("modal-pasos");
        }  
   },
      validateTabCuatro: function(){
     if(
        this.form.telefono_celular &&
        this.form.telefono_celular.length == 14 && 
        this.form.telefono_particular &&
        this.form.telefono_particular.length == 14 &&
        this.form.numero_emergencia &&
        this.form.numero_emergencia.length == 14 &&
        this.form.nombre_contacto_emergencia &&
        this.form.nombre_contacto_emergencia.length > 3){
        return true;
        }else{
          this.mensajemodal= "Por favor llena todos los campos para poder contiuar"
          this.$modal.show("modal-pasos");
        }  
   }
  }
};
</script>

<style scoped>
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
</style>
<style type='text/css'>
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