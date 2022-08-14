export class ComponentUtil {
  static renderCondition = (condition: () => boolean, component: any) => {
    if (!condition()) {
      return (<></>)
    }

    return component
  }
}