export class CssVariables {
  private static getCssVars() {
    return getComputedStyle(document.getElementsByTagName('html')[0])
  }

  public static getCssVar(name: string) {
    return this.getCssVars().getPropertyValue(name)
  }
}
