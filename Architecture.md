# Architecture Notes

## Framework

React was selected because it provides reusable components, fast rendering, and excellent state management for interactive dashboards.

## State Management

React useState was used for handling dashboard filters, search, role selection, and alert acknowledgement.

## Performance Strategy

The application generates 1000 mock devices locally. Filtering and searching are performed on the frontend. The architecture can later be extended to use virtualization for larger datasets.

## Accessibility

Status is communicated using text labels and colored badges. The layout is simple and suitable for desktop and tablet use.

## Future Improvements

* Real-time WebSocket updates
* Backend API integration
* Authentication
* Multi-facility support
* Offline caching

