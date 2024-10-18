class User {
  id: string;
  name: string;
  location: string;
  // Etc...
}

interface EnrolmentCondition {
  isEnrolled(user: User): boolean;
}

class EnrolmentPolicy {
  readonly variantId: string;

  // What conditions to all pass to be enrolled
  readonly conditions: EnrolmentCondition[];

  // What flagValues to use if enrolled
  readonly flagValues: Map<string, string | boolean | number>;

  isUserEnrolled(user: User): boolean {
    return this.conditions.every((condition) => condition.isEnrolled(user));
  }
}

// TODO - how to handle colliding experiments?
export class Experiment {
  readonly name: string;
  readonly id: string;
  readonly seed: string;

  readonly variants: EnrolmentPolicy[];
  readonly control: EnrolmentPolicy;

  // Return first enrolled EnrolmentPolicy. Control is always last checked.
  getEnrolmentPolicyForUser(user: User): EnrolmentPolicy | null {
    for (const variant of this.variants) {
      if (variant.isUserEnrolled(user)) {
        return variant;
      }
    }
    if (this.control.isUserEnrolled(user)) {
      return this.control;
    }
    return null;
  }
}
