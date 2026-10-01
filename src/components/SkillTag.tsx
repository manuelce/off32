type SkillTagProps = {
  label: string
}

export default function SkillTag({ label }: SkillTagProps) {
  return (
    <span className="skill-tag">
      <span className="skill-tag-text">{label}</span>
    </span>
  )
}
