import type {
  AttributeDefinition,
  TierValue,
  RangeValue
} from '../gear_modifiers/gearDefinitions'
import SliderControl from './Slider'

interface AttributesProps {
  attributes: AttributeDefinition[]
  level: number
}

const BaseAttributes = ({ attributes, level }: AttributesProps) => {
  if (!attributes.length) return null

  const filteredAttributes = attributes.filter((attr) => {
    const firstTier = attr.tiers[0];
    const value = firstTier.value as TierValue;

    // Skip if flag exists and is false
    const hasFlag = 'flag' in value;
    return !(hasFlag && !value.flag); // Include only attributes where flag is true or doesn't exist
  });

  return (
    <>
      <b className='ms-2'>Base Attributes</b>
      <ul className="list-group list-group-flush">
        {filteredAttributes.map((attr, i) => {
          const firstTier = attr.tiers[0]
          const value = firstTier.value as TierValue

          const hasFlag = 'flag' in value

          // nice label
          const raw = attr.attribute.split(':')[1] || attr.attribute
          const label = raw.charAt(0).toUpperCase() + raw.slice(1)

          // pick all tiers that include this level
          const applicable = attr.tiers.filter(
            t => t.minLevel <= level && (t.maxLevel === -1 || t.maxLevel >= level)
          )

          // only numeric tiers
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
              // onChange={(v:string) => console.log(attr.attribute, v)}
              />
            )
          }

          return (
            <li key={attr.attribute} className={`list-group-item d-flex align-items-center attribute-base`}>
              <span className='me-2'>{label}</span>
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