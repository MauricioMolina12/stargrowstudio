/**
 * Hace scroll vertical en la ventana o un contenedor específico
 * @param distance La distancia en pixeles que se quiere scrollear. Positivo = hacia abajo, Negativo = hacia arriba
 * @param smooth Si se quiere animación suave (default: true)
 * @param container Opcional: un elemento HTML donde hacer scroll. Por defecto hace scroll en window
 */
export const scrollVertical = (distance: number, smooth: boolean = true, container?: HTMLElement | null) => {
  const scrollTarget = container ?? window;
  
  if (scrollTarget === window) {
    window.scrollBy({
      top: distance,
      behavior: smooth ? "smooth" : "auto",
    });
  } else {
    container!.scrollBy({
      top: distance,
      behavior: smooth ? "smooth" : "auto",
    });
  }
};
