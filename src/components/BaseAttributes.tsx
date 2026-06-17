import type {
  AttributeDefinition,
  TierValue,
  RangeValue
} from '../gear_modifiers/gearDefinitions'
import SliderControl from './Slider'
import { formatAttributeIdentifier } from '../Services/attributeService';

interface AttributesProps {
  attributes: AttributeDefinition[]
  level: number
}

const BaseAttributes = ({ attributes, level }: AttributesProps) => {
  if (!attributes.length) return null

  const filteredAttributes = attributes.filter((attr) => {
    const applicable = attr.tiers.filter(
      t => t.minLevel <= level && (t.maxLevel === -1 || t.maxLevel >= level)
    );
    if (applicable.length === 0) return false;

    const hasEnabledFlag = applicable.some((t) => {
      const value = t.value as TierValue;
      return 'flag' in value && value.flag;
    });

    const hasNumericTier = applicable.some((t) => {
      const value = t.value as TierValue;
      return 'min' in value && 'max' in value && 'step' in value;
    });

    return hasEnabledFlag || hasNumericTier;
  });

  return (
    <>
      <b className='ms-2'>Base Attributes</b>
      <ul className="list-group list-group-flush">
        {filteredAttributes.map((attr, i) => {
          const firstTier = attr.tiers[0]
          const value = firstTier.value as TierValue

          const hasFlag = 'flag' in value

          const applicable = attr.tiers.filter(
            t => t.minLevel <= level && (t.maxLevel === -1 || t.maxLevel >= level)
          )

          const numericTiers = applicable
            .filter(
              t => 'min' in t.value && 'max' in t.value && 'step' in t.value
            )
            .map(t => t.value as RangeValue)

          let sliderElement = null
          if (numericTiers.length) {
            const overallMin  = Math.min(...numericTiers.map(v => v.min))
            const overallMax  = Math.max(...numericTiers.map(v => v.max))
            const overallStep = Math.min(...numericTiers.map(v => v.step))

            const rawMid = overallMin + (overallMax - overallMin) / 2;
            const stepCount = Math.round((rawMid - overallMin) / overallStep);
            const initialValue = overallMin + stepCount * overallStep;
            
            sliderElement = (
              <SliderControl
              min={overallMin}
              max={overallMax}
              step={overallStep}
              value={initialValue}
              id={`attribute-base-${i}`}
              />
            )
          }

          return (
            <li key={attr.attribute} className={`list-group-item d-flex align-items-center attribute-base`}>
              <span className='me-2'>{formatAttributeIdentifier(attr.attribute)}</span>
              {hasFlag && (
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  defaultChecked={false}
                  id={`attribute-base-${i}`}
                />
              )}
              {sliderElement}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default BaseAttributes