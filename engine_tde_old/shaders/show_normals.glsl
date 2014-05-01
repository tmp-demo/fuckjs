//! VERTEX

void main_vs_show_normals() {
  gl_Position = view_proj_mat * vec4(position, 1.0);
  v_position = gl_Position.xyz;
  v_normals = normals;
  v_tex_coords = tex_coords;
}

//! FRAGMENT

void main_fs_show_normals() {
  gl_FragData[0] = vec4(0.5*v_normals+vec3(0.5,0.5,0.5), 1.0);
}