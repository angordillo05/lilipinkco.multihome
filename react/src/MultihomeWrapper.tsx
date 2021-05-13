import { useEffect, useState, Suspense, Fragment } from 'react';
import { useRuntime, NoSSR } from 'vtex.render-runtime';
import classNames from 'classnames';
import Style from './Multihome.css';

const SESION_KEY = 'CURRENT_PAGE';

interface MultihomeWrapperProps {
    lilipinkImage: string;
    yoiImage: string;
    generaIngresos: string;
    tiendas: string;
    generaIngresosYoi: string;
    tiendasYoi: string;
}

enum home {
    lilipink = 'lilipink',
    yoi = 'yoi'
}

const MultihomeWrapper: StorefrontFunctionComponent<MultihomeWrapperProps> = props => {

    const { lilipinkImage, yoiImage, generaIngresos, tiendas,  generaIngresosYoi, tiendasYoi } = props;

    const { navigate } = useRuntime();
    const [site, setSite] = useState<string>(null);

    useEffect(() => {
        if (window) {
            const currentPage = sessionStorage.getItem(SESION_KEY);
            setSite(currentPage || home.lilipink);
        }
    }, [])

    const classes = classNames(Style.siteContainer, site ? Style.siteContainer + '--' + site : null);

    const handleLink = (url: string, name: home) => {
        navigate({ to: url });
        sessionStorage.setItem(SESION_KEY, name);
    }

    return (
    <NoSSR>
        <Suspense fallback={<Fragment/>}>
        <div className={classes}>
        <div className={Style.tabContainer}>
            <div className={Style.tabContainerLink}>
                <a className={Style.tabLink} href="#" onClick={() => handleLink("/", home.lilipink)}  >
                    {lilipinkImage ? <img src={lilipinkImage} alt="lilipink"/> : "Lilipink"}
                </a>
                <a className={Style.tabLink} href="#" onClick={() => handleLink("/home-yoi", home.yoi)} >
                    {yoiImage ? <img src={yoiImage} alt="Yoi"/> : "Yoi"}
                </a>
            </div>
            <div className={Style.tabMenuLink}>
                <a className={Style.tabMultiLinkItem} href={site == home.lilipink ? generaIngresos : generaIngresosYoi }>GENERA INGRESOS ADICIONALES CON NOSOTROS</a>
                <a className={Style.tabMultiLinkItem} href={site == home.lilipink ? tiendas : tiendasYoi}>Tiendas</a>
            </div>
        </div>
        
        {props.children}
    </div>
        </Suspense>
    </NoSSR>)
    
}

MultihomeWrapper.defaultProps = {
    lilipinkImage: "",
    yoiImage: "",
    tiendas: "/stores",
    generaIngresos: "/credipink",
    tiendasYoi: "/stores",
    generaIngresosYoi: "/credipink"
}

MultihomeWrapper.schema = {
    title: "Sitio",
    type: "object",
    properties: {
        lilipinkImage: {
            title: "Imagen lilipink",
            type: "string",
            widget: {
                'ui:widget': 'image-uploader'
            }
        },
        yoiImage: {
            title: "Imagen lilipink",
            type: "string",
            widget: {
                'ui:widget': 'image-uploader'
            }
        },
        generaIngresos: {
            title: "Ingresos URL",
            type: "string",
            default: "/credipink"
        },
        tiendas: {
            title: "tiendas URL",
            type: "string",
            default: "/stores"
        },
        generaIngresosYoi: {
            title: "Ingresos URL Yoi",
            type: "string",
            default: "/credipink"
        },
        tiendasYoi: {
            title: "tiendas URL Yoi",
            type: "string",
            default: "/stores"
        }
    }
}

export default MultihomeWrapper;
