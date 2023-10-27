import {VueKeycloakInstance} from "@dsb-norge/vue-keycloak-js/dist/types";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties  {
        $keycloak: VueKeycloakInstance
    }
}
