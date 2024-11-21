/**
 * Service to get css variables
 */
export class CssVariables {
  /**
   * Retrieve the css variables of the document
   * @returns the css variables of the document
   */
  private static getCssVars() {
    return getComputedStyle(document.getElementsByTagName('html')[0])
  }

  /**
   * Retrieve the value of a css variable
   * @param name name of the variable
   * @returns the value of the css variable
   */
  public static getCssVar(name: string) {
    return this.getCssVars().getPropertyValue(name)
  }
}
