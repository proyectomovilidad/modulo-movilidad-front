// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE = 'http://localhost:3000';
export const environment = {
  production: false,
  BASE,
  backend: {
    aspUisPersonal: BASE + '/aspUisPersonal/',
    aspUisAcademic: BASE + '/aspUisAcademic/',
    aspExtPersonal: BASE + '/aspExtPersonal/',
    aspExtAcademic: BASE + '/aspExtAcademic/',
    institucionCooperante: BASE + '/institucionCooperante/',
    ciudad: BASE + '/ciudad/',
    pais: BASE + '/pais/',
    departamento: BASE + '/departamento/',
    tipoApoyo: BASE + '/tipoApoyo/',
    solicitudPresentada: BASE + '/solicitudPresentada/',
    programaAcademico : BASE + '/programaAcademico/',
    tipoDocumentoId: BASE +'/tipoDocId/',
    entidadFinanciera : BASE + '/entidadFinanciera/',
    profesores: BASE + '/profesores/',
    tipoDocumento: BASE + '/tipoDocumento/',
    tipoMovilidad: BASE + '/tipoMovilidad/',
    convenio: BASE + '/convenio/',
    tipoConvenio: BASE + '/tipoConvenio/',
    convocatoria: BASE + '/convocatoria/',
    tipoProyecto: BASE + '/tipoProyecto/',
    inscripcion: BASE + '/inscripcion/',
    autenticacion: BASE + '/autenticacion/',
    entornoMovilidad: BASE + '/entornoMovilidad/',
    cargaDocumento: BASE + '/cargaDocumentos/'    
    
    
   
  },

  TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb3JyZW8iOiJleEBleC5jb20iLCJsaW1pdGVUaWVtcG8iOjE2MTk3Mjc5MDgsImZlY2hhIjoxNjE5NjQxNTA4LCJyb2wiOjMsIl9pZCI6InVuZGVmaW5lZCJ9.JP_fZUHurlqK9OryHHKZ489lJawf66zeVD8WBAZAmLc',
  user: {Inscripcion:{estado: null}}

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
