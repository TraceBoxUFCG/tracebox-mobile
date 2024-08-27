<script setup lang="ts">
import { Check, Circle } from 'lucide-vue-next'

import { toTypedSchema } from '@vee-validate/zod'
import { get, set } from '@vueuse/core'
import { Form } from '@/components/ui/form'

type StepType = {
  step: number
  title: string
  description: string
}

const props = defineProps<{
  formSchema: any
  steps: StepType[]
  onSubmit: (values: any) => void
}>()

const stepIndex = defineModel<number>('stepIndex', { required: true })
const canGoNext = computed(() => stepIndex.value < props.steps.length)
const canGoBack = computed(() => stepIndex.value > 1)

const goNext = () => {
  if (get(canGoNext)) {
    set(stepIndex, stepIndex.value + 1)
  }
}
const goBack = () => {
  if (get(canGoBack)) {
    set(stepIndex, stepIndex.value - 1)
  }
}
</script>

<template>
  <Form
    v-slot="{ meta, values, validate }"
    as=""
    keep-values
    :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
  >
    <form
      @submit="
        (e) => {
          e.preventDefault()
          validate()

          if (stepIndex === steps.length) {
            onSubmit(values)
          }
        }
      "
    >
      <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
        <StepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full flex-col items-center justify-center"
          :step="step.step"
        >
          <StepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />

          <StepperTrigger as-child>
            <Button
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              size="icon"
              class="z-10 shrink-0 rounded-full"
              :class="[
                state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              ]"
              :disabled="state !== 'completed' && !meta.valid"
            >
              <Check v-if="state === 'completed'" class="size-5" />
              <Circle v-if="state === 'active'" />
            </Button>
          </StepperTrigger>

          <div class="mt-5 flex flex-col items-center text-center">
            <StepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              {{ step.title }}
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>

      <div class="mt-4 flex flex-col gap-4">
        <slot />
      </div>

      <div class="mt-4 flex items-center justify-between">
        <Button :disabled="!canGoBack" variant="outline" size="sm" @click="goBack"> Voltar </Button>
        <div class="flex items-center gap-3">
          <Button
            v-if="stepIndex !== steps.length"
            :type="meta.valid ? 'button' : 'submit'"
            :disabled="!canGoNext"
            size="sm"
            @click="meta.valid && goNext()"
          >
            Próximo
          </Button>
          <Button v-if="stepIndex === steps.length" size="sm" type="submit"> Salvar </Button>
        </div>
      </div>
    </form>
  </Form>
</template>
