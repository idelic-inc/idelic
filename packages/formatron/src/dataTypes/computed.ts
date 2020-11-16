import {DataType} from '../dataType';
import {DATE_FORMAT} from '../utils/constants';
import {formatCurrency} from '../utils/functions';
import {LABEL_FALSE, LABEL_TRUE} from './boolean';

const TYPE_DATETIME = 'datetime';

export class ComputedType extends DataType<any> {
  public static readonly typeName = 'computed';

  get defaultValue(): any {
    return super.defaultValue ?? '';
  }

  isOfType(value: unknown): value is any {
    const type = this.resultDataType;
    return type.isOfType(value);
  }

  get type(): string {
    return this.field.options?.resultType ?? 'computed';
  }

  get resultDataType(): DataType {
    const ResultDataType = this.formatron.getDataType(this.type);
    return new (ResultDataType as any)(this.field);
  }

  get dateType(): string {
    return this.field.options?.dateType ?? TYPE_DATETIME;
  }

  get format(): string {
    return this.field.options?.format ?? DATE_FORMAT;
  }

  getFormattedValue(value: any): string {
    const {formatType} = this;
    switch (formatType) {
      case 'currency':
        return formatCurrency(value);
      default:
        if (typeof value === 'string') {
          return value;
        }
        return value ? LABEL_TRUE : LABEL_FALSE;
    }
  }
}
