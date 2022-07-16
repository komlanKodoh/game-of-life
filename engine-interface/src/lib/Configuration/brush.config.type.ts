import Renderer from "../Renderer/Renderer";

/**
 * Brush configuration is passed down to the renderer. A brush is used to paint 
 * the cells to the canvas. Changing this configuration will change the way the
 *  world is rendered onto the screen
 */
export type BrushConfig = {
    /** Relative cell size in universe */
    size: number,
    /** cell Relative radius in universe */
    radius: number,
    /** cell relative padding in universe */
    padding: number,
  
    /** The color of the line in the grid that separates every cell */
    grid_line_color: string,
    /** Scene fill color */
    canvas_fill_color: string,
    /** Color of cell selection */
    selection_color: string,

    /**Returns cell color depending of the the state that is passed */
    cell_shader: (
        /** A number between 0 and 255 */
        state: number) => string;

    renderer: Renderer
  };