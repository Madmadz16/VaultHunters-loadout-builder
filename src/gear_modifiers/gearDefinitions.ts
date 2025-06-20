import sword       from "./sword.json";
import axe         from "./axe.json";
import shield      from "./shield.json";
import focus       from "./focus.json";
import wand        from "./wand.json";
import magnet      from "./magnet.json";
import voidStone   from "./void_stone.json";
import helmet      from "./helmet.json";
import chestplate  from "./chestplate.json";
import leggings    from "./leggings.json";
import boots       from "./boots.json";

export type GearType =
  | 'Sword' | 'Axe' | 'Shield'
  | 'Focus' | 'Wand' | 'Magnet'
  | 'Void Stone'
  | 'Helmet' | 'Chestplate' | 'Leggings' | 'Boots';

export interface ModifierGroup {
  implicits:  string[];
  prefixes:   string[];
  suffixes:   string[];
}

export interface GearDefinition {
  ext: 'gif' | 'png';
  modifiers: ModifierGroup;
}

interface RawModifier { identifier: string }
interface RawModifierGroup {
  IMPLICIT: RawModifier[];
  PREFIX:  RawModifier[];
  SUFFIX:  RawModifier[];
}


function toModifierGroup(mg: RawModifierGroup): ModifierGroup {
  return {
    implicits:  (mg.IMPLICIT).map(m => m.identifier) ?? [],
    prefixes:   (mg.PREFIX).map(m => m.identifier) ?? [],
    suffixes:   (mg.SUFFIX).map(m => m.identifier) ?? [],
  };
}

export const gearDefinitions: Record<GearType, GearDefinition> = {
  Sword:       { ext: 'gif', modifiers: toModifierGroup(sword.modifierGroup) },
  Axe:         { ext: 'gif', modifiers: toModifierGroup(axe.modifierGroup) },
  Shield:      { ext: 'png', modifiers: toModifierGroup(shield.modifierGroup) },
  Focus:       { ext: 'png', modifiers: toModifierGroup(focus.modifierGroup) },
  Wand:        { ext: 'png', modifiers: toModifierGroup(wand.modifierGroup) },
  Magnet:      { ext: 'png', modifiers: toModifierGroup(magnet.modifierGroup) },
  'Void Stone':{ ext: 'png', modifiers: toModifierGroup(voidStone.modifierGroup) },
  Helmet:      { ext: 'gif', modifiers: toModifierGroup(helmet.modifierGroup) },
  Chestplate:  { ext: 'gif', modifiers: toModifierGroup(chestplate.modifierGroup) },
  Leggings:    { ext: 'gif', modifiers: toModifierGroup(leggings.modifierGroup) },
  Boots:       { ext: 'gif', modifiers: toModifierGroup(boots.modifierGroup) },
};