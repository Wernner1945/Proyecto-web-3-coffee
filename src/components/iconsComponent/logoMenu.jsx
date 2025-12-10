import React from "react";


function IconoMenuNav({ancho, alto}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={ancho} height={alto} viewBox="0 0 24 24"><g fill="none" stroke="#5584d0ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path fill="currentColor" fillOpacity="0" strokeDasharray="48" strokeDashoffset="48" d="M17 9v9c0 1.66 -1.34 3 -3 3h-6c-1.66 0 -3 -1.34 -3 -3v-9Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path strokeDasharray="14" strokeDashoffset="14" d="M17 9h3c0.55 0 1 0.45 1 1v3c0 0.55 -0.45 1 -1 1h-3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path><mask id="IconifyId19b00545155a325c70"><path stroke="#5584d0ff" d="M8 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M12 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4M16 0c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4"><animateMotion calcMode="linear" dur="3s" path="M0 0v-8" repeatCount="indefinite"/></path></mask><rect width="24" height="0" y="7" fill="currentColor" mask="url(#IconifyId19b00545155a325c70)"><animate fill="freeze" attributeName="y" begin="0.8s" dur="0.6s" values="7;2"/><animate fill="freeze" attributeName="height" begin="0.8s" dur="0.6s" values="0;5"/></rect></g></svg>
    )
}



export default IconoMenuNav