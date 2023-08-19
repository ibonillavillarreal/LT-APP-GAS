export class GlobalUtilities {

    static instance: GlobalUtilities;

    private isLoading: boolean = false;
    private Authenticated: boolean = false; // true valor anterior
    private isLoadingDetails: boolean = false;
    private AuthModule:Number[]=[];
    private ModuloActivo!:number;

    private constructor() {

    }
        //TODO: set()
    public setAuthenticated(Authenticated: boolean) {
        this.Authenticated = Authenticated;
    }
    public setAuthModule(authmodule:Number[]){
        this.AuthModule = authmodule;
    }
    public setModuloActivo(modulo_activo:number){
            this.ModuloActivo = modulo_activo;
    }

    public setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    public setisLoadingDetails(isLoadingDetails: boolean) {
        this.isLoadingDetails = isLoadingDetails;
    }
    
    
    
    //TODO: get()
    public static getInstance(): GlobalUtilities {
        if (!GlobalUtilities.instance) {
            GlobalUtilities.instance = new GlobalUtilities();
        }
        return GlobalUtilities.instance;
    }
    
    public IsAuthenticated() {
        return this.Authenticated;
    }
    public getAuthModule(){
        return this.AuthModule;
    }

    public getModuloActivo(){
        return this.ModuloActivo;
    }
    
    public getIsLoading() {
        return this.isLoading;
    }

    public getisLoadingDetails() {
        return this.isLoadingDetails;
    }

}