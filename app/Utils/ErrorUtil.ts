export class ErrorUtil {
  public static jsonUnique(rule: string, field: string, message: string): Object {
    return { errors: [{ rule: rule, field: field, message: message }] }
  }

  public static jsonDefault(message: string): Object {
    return { errors: [{ message: message }] }
  }
}
