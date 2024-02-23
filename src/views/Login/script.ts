import { Options, Vue } from "vue-class-component";
import ConectarLogin from "@/views/Login/components/ConectarLogin.vue";
import CadastrarLogin from "@/views/Login/components/CadastrarLogin.vue";

@Options({
  components: {
    ConectarLogin,
    CadastrarLogin,
  },
})
export default class HomeView extends Vue {}