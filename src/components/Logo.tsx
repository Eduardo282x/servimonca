
type LogoProps = {
    widthLogo: string;
    heightLogo: string;
}

export default function Logo({widthLogo, heightLogo} : LogoProps) {

    return (

        <img 
            src="../src/assets/img/servimoncaLogo.jpg"
            alt="Logotipo Servimonca"
            className={`rounded-full ${widthLogo} ${heightLogo}`}
        />

    );

}