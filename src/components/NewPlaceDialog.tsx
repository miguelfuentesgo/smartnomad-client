/**
 * Nuevo lugar — shadcn/ui (solo los componentes que añadiste)
 * =============================================================
 *
 * 1) Dialog (Radix + estilos shadcn)
 *    - `Dialog` es la raíz: controla si el modal está abierto con `open` / `onOpenChange`.
 *    - `DialogTrigger` (opcional): envuelve el botón que abre el modal; al hacer clic Radix pone `open=true`.
 *    - `DialogContent`: el panel centrado; ya incluye overlay y botón cerrar (X).
 *    - `DialogHeader`, `DialogTitle`, `DialogDescription`: accesibilidad (título anunciado a lectores de pantalla).
 *    - `DialogFooter`: zona de acciones (Cancelar / Guardar).
 *
 * 2) Formulario sin `<Form>` de shadcn
 *    Tú no instalaste el bloque `form` (react-hook-form + zod), así que este es un `<form>` HTML clásico
 *    con estado React (`useState`). Los inputs son componentes shadcn (`Input`, `Textarea`, `Label`, `Button`).
 *
 * 3) Flujo
 *    Enviar → `createPlace` (Axios) → si va bien, cerrar diálogo, vaciar campos y llamar `onCreated`
 *    (por ejemplo volver a pedir la lista al store).
 */

import { useState, type FormEvent } from 'react'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createPlace, type CreatePlacePayload } from '@/api/place'

type Props = {
  /** Después de crear bien el lugar (p. ej. `() => getPlaces({ limit: 10 })`). */
  onCreated?: () => void
}

const emptyForm = () => ({
  name: '',
  visit_time: '',
  avg_price: '',
  description: '',
  latitude: '',
  longitude: '',
})

export function NewPlaceDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [fields, setFields] = useState(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof ReturnType<typeof emptyForm>>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }))
  }

  function reset() {
    setFields(emptyForm())
    setFormError(null)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) reset()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    const lat = Number(fields.latitude)
    const lng = Number(fields.longitude)
    if (!fields.name.trim()) {
      setFormError('El nombre es obligatorio.')
      return
    }
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setFormError('Latitud y longitud deben ser números válidos.')
      return
    }

    const payload: CreatePlacePayload = {
      name: fields.name.trim(),
      visit_time: fields.visit_time.trim(),
      avg_price: fields.avg_price.trim(),
      description: fields.description.trim(),
      latitude: lat,
      longitude: lng,
    }

    setSubmitting(true)
    try {
      await createPlace(payload)
      setOpen(false)
      reset()
      onCreated?.()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as Record<string, unknown>
        const detail = data.detail ?? data.non_field_errors
        setFormError(
          typeof detail === 'string'
            ? detail
            : Array.isArray(detail)
              ? detail.join(' ')
              : 'No se pudo crear el lugar.',
        )
      } else {
        setFormError('No se pudo crear el lugar.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/*
        DialogTrigger + asChild: el Button es quien abre el diálogo (Radix asocia el clic al Root).
        Sin asChild, Trigger renderizaría su propio botón y anidarías botones inválidos.
      */}
      <DialogTrigger asChild>
        <Button type="button">New place</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Nuevo lugar</DialogTitle>
          <DialogDescription>
            Los datos se envían a la API; el perfil lo asigna el servidor (usuario logueado).
          </DialogDescription>
        </DialogHeader>

        <form id="new-place-form" onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="place-name">Nombre</Label>
            <Input
              id="place-name"
              name="name"
              value={fields.name}
              onChange={(e) => update('name', e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-visit-time">Tiempo de visita</Label>
            <Input
              id="place-visit-time"
              name="visit_time"
              value={fields.visit_time}
              onChange={(e) => update('visit_time', e.target.value)}
              placeholder="ej. 1–2 horas"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-price">Precio medio</Label>
            <Input
              id="place-price"
              name="avg_price"
              value={fields.avg_price}
              onChange={(e) => update('avg_price', e.target.value)}
              placeholder="0.00"
              inputMode="decimal"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-description">Descripción</Label>
            <Textarea
              id="place-description"
              name="description"
              value={fields.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="place-lat">Latitud</Label>
              <Input
                id="place-lat"
                name="latitude"
                value={fields.latitude}
                onChange={(e) => update('latitude', e.target.value)}
                inputMode="decimal"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="place-lng">Longitud</Label>
              <Input
                id="place-lng"
                name="longitude"
                value={fields.longitude}
                onChange={(e) => update('longitude', e.target.value)}
                inputMode="decimal"
              />
            </div>
          </div>
          {formError && (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          )}
        </form>

        {/*
          DialogFooter: franja de acciones. "Cancelar" usa type="button" para no disparar submit del form.
          "Guardar" usa form="new-place-form" para asociarse al <form> aunque el botón esté fuera en el DOM.
        */}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" form="new-place-form" disabled={submitting}>
            {submitting ? 'Guardando…' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
