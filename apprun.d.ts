declare module 'apprun' {

  export type Element = HTMLElement | string;

  export type View<T> = (state: T) => string | Function | void;
  export type Action<T> = (state: T, ...p: any[]) => T | Promise<T>;
  export type Update<T> = { [name: string]: Action<T> | {}[] | void; };

  export class IComponent<T=any> {
    readonly state: T;
    view: View<T>;
    update: Update<T>;
  }

  export type VNode = {
    tag: string,
    props: {},
    children: Array<VNode>
  } | string;


  export interface IApp {
    start<T>(element: Element, model: T, view: View<T>, update: Update<T>,
      options?: { history?, rendered?: (state: T) => void }): Component<T>;
    on(name: string, fn: (...args: any[]) => void, options?: any): void;
    run(name: string, ...args: any[]): void;
    createElement(tag: string | Function, props, ...children): VNode;
    render(element: HTMLElement, node: VNode): void;
  }

  export class Component<T=any> {
    constructor(state?: T, view?: View<T>, update?: Update<T>);
    readonly state: T;
    setState(state: T, options?: { render?: boolean, history?: boolean }): void;
    mount(element?: Element, options?: { render?: boolean, history?, global_event?: boolean }): Component<T>;
    start(element?: Element, options?: { render?: boolean, history?, global_event?: boolean }): Component<T>;
    on(name: string, fn: (...args: any[]) => void, options?: any): void;
    run(name: string, ...args: any[]): void;
    rendered: (state: T) => void;
  }

  export type StatelessComponent<T={}> = (args: T) => VNode | void;

  export function on(name?: string, options?: { render?: boolean, history?: boolean });
  // obsolete
  export function update(name?: string, options?: { render?: boolean, history?: boolean });
  export function event(name?: string, options?: { render?: boolean, history?: boolean });

  export const app: IApp
  export default app;

}